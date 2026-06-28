(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.SchooltopiaShare = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const MAX_SHARE_BYTES = 60000;
  const MAX_CUSTOM_EVENTS = 30;
  const VALID_STATS = new Set(["wisdom", "stamina", "mood", "peerFavor", "homeroomTrust"]);
  const DEFAULT_SKIN = {
    primary: "#245f61",
    accent: "#d09a39",
    danger: "#b64d3f",
    sky: "#10242b",
  };
  const DEFAULT_WEIGHTS = {
    eventFrequency: 1,
    academicPressure: 1,
    socialSupport: 1,
    recovery: 1,
    trustSensitivity: 1,
  };

  function cleanText(value, maxLength, fallback = "") {
    const text = String(value ?? "")
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
      .trim()
      .slice(0, maxLength);
    return text || fallback;
  }

  function cleanId(value, fallback) {
    return cleanText(value, 80).replace(/[^a-zA-Z0-9_-]/g, "") || fallback;
  }

  function clamp(value, min, max, fallback) {
    const number = Number(value);
    return Math.max(min, Math.min(max, Number.isFinite(number) ? number : fallback));
  }

  function cleanHex(value, fallback) {
    const text = cleanText(value, 7);
    return /^#[0-9a-fA-F]{6}$/.test(text) ? text : fallback;
  }

  function normalizeEffects(effects) {
    if (!Array.isArray(effects)) return [];
    return effects
      .slice(0, 4)
      .map((effect) => ({
        stat: VALID_STATS.has(effect?.stat) ? effect.stat : "",
        delta: clamp(effect?.delta, -5, 5, 0),
      }))
      .filter((effect) => effect.stat && effect.delta !== 0);
  }

  function normalizeOptions(options) {
    if (!Array.isArray(options)) return [];
    return options.slice(0, 3).map((option, index) => ({
      id: cleanId(option?.id, `choice_${index + 1}`),
      label: cleanText(option?.label, 60, `Choice ${index + 1}`),
      detail: cleanText(option?.detail, 180),
      effects: normalizeEffects(option?.effects),
    }));
  }

  function normalizeEvents(events) {
    if (!Array.isArray(events)) return [];
    return events.slice(0, MAX_CUSTOM_EVENTS).map((event, index) => {
      const options = normalizeOptions(event?.options);
      const normalizeTranslation = (translation) => translation ? {
        title: cleanText(translation.title, 60),
        description: cleanText(translation.description, 360),
        options: Array.isArray(translation.options)
          ? translation.options.slice(0, 3).map((option, optionIndex) => ({
            id: cleanId(option?.id, options[optionIndex]?.id || `choice_${optionIndex + 1}`),
            label: cleanText(option?.label, 60),
            detail: cleanText(option?.detail, 180),
          }))
          : [],
      } : null;
      const translations = {
        zh: normalizeTranslation(event?.translations?.zh),
        en: normalizeTranslation(event?.translations?.en),
      };
      return {
        id: cleanId(event?.id, `shared_event_${index + 1}`),
        title: cleanText(event?.title, 60, `Campus Event ${index + 1}`),
        category: cleanId(event?.category, "campus"),
        route: ["student", "teacher", "both"].includes(event?.route) ? event.route : "student",
        description: cleanText(event?.description, 360),
        chance: clamp(event?.chance, 1, 100, 22),
        enabled: event?.enabled !== false,
        generated: event?.generated === true,
        sourceLanguage: event?.sourceLanguage === "en" ? "en" : "zh",
        translations: translations.zh || translations.en ? translations : undefined,
        options,
      };
    });
  }

  function normalizeConfig(input = {}) {
    const skin = input.skin || {};
    const weights = input.weights || {};
    return {
      id: cleanId(input.id, "shared-school"),
      name: cleanText(input.name, 60, "Schooltopia"),
      tagline: cleanText(input.tagline, 140, "Every school has its own survival rules."),
      skin: {
        primary: cleanHex(skin.primary, DEFAULT_SKIN.primary),
        accent: cleanHex(skin.accent, DEFAULT_SKIN.accent),
        danger: cleanHex(skin.danger, DEFAULT_SKIN.danger),
        sky: cleanHex(skin.sky, DEFAULT_SKIN.sky),
      },
      weights: {
        eventFrequency: clamp(weights.eventFrequency, 0.6, 1.4, DEFAULT_WEIGHTS.eventFrequency),
        academicPressure: clamp(weights.academicPressure, 0.6, 1.4, DEFAULT_WEIGHTS.academicPressure),
        socialSupport: clamp(weights.socialSupport, 0.6, 1.4, DEFAULT_WEIGHTS.socialSupport),
        recovery: clamp(weights.recovery, 0.6, 1.4, DEFAULT_WEIGHTS.recovery),
        trustSensitivity: clamp(weights.trustSensitivity, 0.6, 1.4, DEFAULT_WEIGHTS.trustSensitivity),
      },
      version: Math.max(1, Math.round(clamp(input.version, 1, 9999, 1))),
      customEvents: normalizeEvents(input.customEvents),
    };
  }

  function compactConfig(config) {
    const school = normalizeConfig(config);
    return {
      v: 1,
      i: school.id,
      n: school.name,
      t: school.tagline,
      s: [school.skin.primary, school.skin.accent, school.skin.danger, school.skin.sky],
      w: [
        school.weights.eventFrequency,
        school.weights.academicPressure,
        school.weights.socialSupport,
        school.weights.recovery,
        school.weights.trustSensitivity,
      ],
      r: school.version,
      e: school.customEvents.map((event) => ({
        i: event.id,
        t: event.title,
        c: event.category,
        r: event.route,
        d: event.description,
        p: event.chance,
        n: event.enabled,
        g: event.generated,
        l: event.sourceLanguage,
        x: event.translations,
        o: event.options.map((option) => ({
          i: option.id,
          l: option.label,
          d: option.detail,
          e: option.effects.map((effect) => [effect.stat, effect.delta]),
        })),
      })),
    };
  }

  function expandConfig(payload) {
    if (!payload || payload.v !== 1) throw new Error("Unsupported shared school version.");
    return normalizeConfig({
      id: payload.i,
      name: payload.n,
      tagline: payload.t,
      skin: {
        primary: payload.s?.[0],
        accent: payload.s?.[1],
        danger: payload.s?.[2],
        sky: payload.s?.[3],
      },
      weights: {
        eventFrequency: payload.w?.[0],
        academicPressure: payload.w?.[1],
        socialSupport: payload.w?.[2],
        recovery: payload.w?.[3],
        trustSensitivity: payload.w?.[4],
      },
      version: payload.r,
      customEvents: Array.isArray(payload.e)
        ? payload.e.map((event) => ({
          id: event.i,
          title: event.t,
          category: event.c,
          route: event.r,
          description: event.d,
          chance: event.p,
          enabled: event.n,
          generated: event.g,
          sourceLanguage: event.l,
          translations: event.x,
          options: Array.isArray(event.o)
            ? event.o.map((option) => ({
              id: option.i,
              label: option.l,
              detail: option.d,
              effects: Array.isArray(option.e)
                ? option.e.map(([stat, delta]) => ({ stat, delta }))
                : [],
            }))
            : [],
        }))
        : [],
    });
  }

  function bytesToBase64(bytes) {
    if (typeof Buffer !== "undefined") return Buffer.from(bytes).toString("base64");
    let binary = "";
    for (let index = 0; index < bytes.length; index += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
    }
    return btoa(binary);
  }

  function base64ToBytes(base64) {
    if (typeof Buffer !== "undefined") return Uint8Array.from(Buffer.from(base64, "base64"));
    const binary = atob(base64);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  }

  function encodeConfig(config) {
    const bytes = new TextEncoder().encode(JSON.stringify(compactConfig(config)));
    if (bytes.length > MAX_SHARE_BYTES) throw new Error("This school has too much content for a share link.");
    return bytesToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function decodeConfig(encoded) {
    const value = cleanText(encoded, MAX_SHARE_BYTES * 2);
    if (!value || !/^[A-Za-z0-9_-]+$/.test(value)) throw new Error("Invalid shared school link.");
    const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
    const bytes = base64ToBytes(padded);
    if (bytes.length > MAX_SHARE_BYTES) throw new Error("Shared school link is too large.");
    return expandConfig(JSON.parse(new TextDecoder().decode(bytes)));
  }

  function buildShareUrl(currentHref, config) {
    const sourceUrl = new URL(currentHref);
    const url = new URL("index.html", currentHref);
    url.search = "";
    if (sourceUrl.searchParams.has("static")) url.searchParams.set("static", "1");
    const params = new URLSearchParams();
    params.set("school", normalizeConfig(config).id);
    params.set("config", encodeConfig(config));
    url.hash = params.toString();
    return url.toString();
  }

  function readShareUrl(href) {
    const url = new URL(href);
    const encoded = new URLSearchParams(url.hash.replace(/^#/, "")).get("config");
    return encoded ? decodeConfig(encoded) : null;
  }

  return {
    MAX_SHARE_BYTES,
    buildShareUrl,
    decodeConfig,
    encodeConfig,
    normalizeConfig,
    readShareUrl,
  };
});
