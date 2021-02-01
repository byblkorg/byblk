import {
  getInitialsFromString,
  getISOCode,
  getShortCode,
  generateRandomizedString,
  generateInviteCode,
  shuffleString,
} from "./index";

describe("generate invite code", () => {
  describe("getInitialsFromString", () => {
    test("can accurately generate initials from string", () => {
      expect(getInitialsFromString("Cool Whip")).toStrictEqual("cw");
    });
  });

  describe("getISOCode", () => {
    test("can accurately grab iso number from country-code-lookup library", () => {
      expect(getISOCode("US")).toStrictEqual("840");
    });
  });

  describe("getShortCode", () => {
    test("can accurately grab region short code from country-region-data library", () => {
      expect(
        getShortCode({
          countryShortCode: "US",
          regionName: "New Jersey",
        })
      ).toStrictEqual(19);
    });

    test("cannot return NaN", () => {
      expect(
        getShortCode({
          countryShortCode: "US",
          regionName: "NJ",
        })
      ).toStrictEqual(0);
    });
  });

  describe("generateRandomizedString", () => {
    test("generates a randomized string with a length of 4", () => {
      expect(generateRandomizedString().length).toStrictEqual(4);
    });
  });

  describe("shuffleString", () => {
    test("shuffles a string", () => {
      expect(shuffleString("COOLWHIP")).not.toStrictEqual("COOLWHIP");
    });
  });

  describe("generateInviteCode", () => {
    const inviteCode = generateInviteCode({
      businessName: "Awesome Company",
      regionName: "New Jersey",
      countryShortCode: "US",
    });

    test("contains company initials", () => {
      expect(inviteCode).toContain("a");
      expect(inviteCode).toContain("c");
    });

    test("contains region short code numbers", () => {
      expect(inviteCode).toContain("1");
      expect(inviteCode).toContain("9");
    });

    test("contains country iso code", () => {
      expect(inviteCode).toContain("8");
      expect(inviteCode).toContain("4");
      expect(inviteCode).toContain("0");
    });
  });
});
