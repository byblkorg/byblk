import lookup from "country-code-lookup";
import regionData from "country-region-data";
import crypto from "crypto";

export function generateInviteCode({
  businessName,
  countryShortCode,
  regionName,
}) {
  return shuffleString(
    `${getInitialsFromString(businessName)}${getISOCode("US")}${getShortCode({
      countryShortCode: countryShortCode,
      regionName: regionName,
    })}${generateRandomizedString()}`
  );
}

export function getInitialsFromString(str) {
  let names = str.toLowerCase().split(" "),
    initials = names[0].substring(0, 1);
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1);
  }
  return initials;
}

export function getISOCode(country) {
  return lookup.byFips(country).isoNo;
}

export function getShortCode({ countryShortCode, regionName }) {
  const shortCode = Math.abs(
    regionData
      .filter((country) => country.countryShortCode === countryShortCode)
      .map(
        (country) =>
          country.regions.filter((region) => region.name === regionName)[0]
      )[0]
      ?.shortCode.charCodeAt(0) - 97
  );
  if (isNaN(shortCode)) {
    return 0;
  } else {
    return shortCode;
  }
}

export function generateRandomizedString() {
  return crypto.randomBytes(2).toString("hex");
}

export function shuffleString(str) {
  return str
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}
