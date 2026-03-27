import { buildSearchParams, cn } from "@/utils";

describe("buildSearchParams", () => {
  it("updates and adds query params", () => {
    const current = new URLSearchParams("page=1&sort=name");

    const result = buildSearchParams(current, {
      page: 2,
      q: "angie",
    });

    const params = new URLSearchParams(result);
    expect(params.get("page")).toBe("2");
    expect(params.get("sort")).toBe("name");
    expect(params.get("q")).toBe("angie");
  });

  it("removes keys for null or undefined", () => {
    const current = new URLSearchParams("page=1&sort=name");

    const result = buildSearchParams(current, {
      sort: undefined,
      page: null,
    });

    const params = new URLSearchParams(result);
    expect(params.has("sort")).toBe(false);
    expect(params.has("page")).toBe(false);
  });
});

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", undefined, "b")).toBe("a b");
  });

  it("returns empty string when no classes are provided", () => {
    expect(cn(undefined)).toBe("");
  });
});
