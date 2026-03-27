import { renderHook, act } from "@testing-library/react";
import { useTableState } from "@/hooks/useTable";

const replaceMock = jest.fn();

const getMock = jest.fn();
const toStringMock = jest.fn(() => "");

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => ({
    get: getMock,
    toString: toStringMock,
  }),
}));

type Row = {
  id: number;
  name: string;
  income: number;
};

const createRows = (count: number): Row[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Name ${String.fromCharCode(65 + (i % 26))}-${i}`,
    income: 10000 + i,
  }));

describe("useTableState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getMock.mockImplementation((key: string) => {
      if (key === "page") return null;
      if (key === "sort") return null;
      return null;
    });
    toStringMock.mockReturnValue("");
  });

  it("uses default sort and page when url params are missing", () => {
    const rows = createRows(3);

    const { result } = renderHook(() => useTableState(rows, "name"));

    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortOrder).toBe("asc");
    expect(result.current.currentPage).toBe(1);
  });

  it("sorts and toggles order on same key", () => {
    const rows: Row[] = [
      { id: 1, name: "Carlos", income: 30000 },
      { id: 2, name: "Ana", income: 10000 },
      { id: 3, name: "Bruno", income: 20000 },
    ];

    const { result } = renderHook(() => useTableState([...rows], "name"));

    expect(result.current.data.map((r) => r.name)).toEqual([
      "Ana",
      "Bruno",
      "Carlos",
    ]);

    act(() => {
      result.current.handleSort("name");
    });

    expect(result.current.sortOrder).toBe("desc");
    expect(result.current.data.map((r) => r.name)).toEqual([
      "Carlos",
      "Bruno",
      "Ana",
    ]);
  });

  it("paginates with page size 10 and allows navigation", () => {
    const rows = createRows(25);

    const { result } = renderHook(() => useTableState(rows, "id"));

    expect(result.current.data).toHaveLength(10);
    expect(result.current.label).toBe("1-10 of 25");
    expect(result.current.hasPrev).toBe(false);
    expect(result.current.hasNext).toBe(true);

    act(() => {
      result.current.next();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.label).toBe("11-20 of 25");
    expect(result.current.hasPrev).toBe(true);

    act(() => {
      result.current.prev();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("syncs page and sort state to router query params", () => {
    const rows = createRows(3);

    const { result } = renderHook(() => useTableState(rows, "income"));

    act(() => {
      result.current.handleSort("income");
    });

    expect(replaceMock).toHaveBeenCalled();
    const lastCallArg =
      replaceMock.mock.calls[replaceMock.mock.calls.length - 1][0];
    expect(lastCallArg).toContain("page=1");
    expect(lastCallArg).toContain("sort=");
  });
});
