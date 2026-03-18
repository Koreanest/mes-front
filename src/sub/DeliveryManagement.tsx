import { useEffect, useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { StatusPill } from "../styled/Delivery.styles";

/** 납품 상태 */
export type DeliveryStatus = "미납" | "부분" | "완납";


/** 납품관리 테이블 한 행 데이터 */
export type DeliveryRow = {
  id: number | string; // 수주 상세의 고유 ID

  orderNo: string; // 수주번호
  orderDate: string; // 수주일자 (YYYY-MM-DD)
  customerName: string; // 거래처명

  itemCode: string; // 품목코드
  itemName: string; // 품목명
  spec?: string; // 규격

  orderQty: number; // 수주수량
  remainQty: number; // 잔량

  deliveryDate?: string; // 납품일 (없으면 오늘로 세팅)
  warehouse?: string; // 창고 코드 (없으면 첫 번째 창고로 세팅)
  status?: DeliveryStatus; // 납품 상태
};

/** 부모(상단 버튼)에서 일괄납품 처리할 때 쓰는 “현재 입력/선택 상태” */
export type DeliveryDraft = {
  selectedIds: Array<DeliveryRow["id"]>; // 체크된 행들의 id 목록
  deliverQtyById: Record<string, number>; // key(문자열 id)별 납품수량 입력값
  deliveryDateById: Record<string, string>; // key별 납품일 입력값
  warehouseById: Record<string, string>; // key별 창고 선택값
};

type ProcessPayload = {
  id: DeliveryRow["id"];
  deliverQty: number;
  deliveryDate: string;
  warehouse: string;
};


type Props = {
  rows: DeliveryRow[]; // 테이블에 표시할 데이터
  warehouses?: readonly string[]; // 창고 옵션 (없으면 기본값 사용)

  /** ✅ 현재 선택/입력(draft)을 부모로 전달(상단과 연결) */
  onDraftChange?: (draft: DeliveryDraft) => void;

  /** 한 행만 납품처리 */
  onProcessRow?: (payload: ProcessPayload) => void | Promise<void>;

  /** 여러 행을 일괄 납품처리 */
  onProcessBulk?: (payloads: ProcessPayload[]) => void | Promise<void>;

  /** 오늘 날짜 기본값(커스터마이즈 가능) */
  today?: string; // YYYY-MM-DD
};

/** id를 문자열로 통일(Record key / Set key로 쓰기 위함) */
function toKey(id: DeliveryRow["id"]) {
  return String(id);
}

/** 오늘 날짜를 YYYY-MM-DD로 만들기 */
function getTodayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function DeliveryManagement({
  rows,
  warehouses = ["WH-01", "WH-02", "WH-03"],
  onDraftChange,
  onProcessRow,
  onProcessBulk,
  today = getTodayISO(),
}: Props) {
  /** ✅ 체크박스 선택 상태(Set에는 문자열 key를 저장) */
  const [selected, setSelected] = useState<Set<string>>(new Set());

  /** ✅ 행별 입력값 상태(납품수량/납품일/창고) */
  const [deliverQtyById, setDeliverQtyById] = useState<Record<string, number>>({});
  const [deliveryDateById, setDeliveryDateById] = useState<Record<string, string>>({});
  const [warehouseById, setWarehouseById] = useState<Record<string, string>>({});
  
  const fallbackWarehouse = warehouses[0] ?? "WH-01";

  /**
   * ✅ rows(서버 데이터) + 사용자가 입력한 상태를 합쳐서
   * 화면에서 바로 렌더링 가능한 형태로 “정규화”한 리스트
   */
  const normalizedRows = useMemo(() => {
    return rows.map((r) => {
      const key = toKey(r.id);

      // 입력값이 있으면 입력값 우선, 없으면 서버값/기본값 사용
      const deliveryDate = deliveryDateById[key] ?? r.deliveryDate ?? today;
      const warehouse = warehouseById[key] ?? r.warehouse ?? fallbackWarehouse;
      const deliverQty = deliverQtyById[key] ?? 0;

      const status: DeliveryStatus =
        r.status ?? (r.remainQty === 0 ? "완납" : "미납");

      return {
        ...r,
        _key: key,
        _deliveryDate: deliveryDate,
        _warehouse: warehouse,
        _deliverQty: deliverQty,
        _status: status,
      };
    });
  }, [rows, deliverQtyById, deliveryDateById, warehouseById, today, fallbackWarehouse,]);

  /** ✅ 전체 key 목록(전체선택 계산용) */
  const allKeys = useMemo(() => normalizedRows.map((r) => r._key), [normalizedRows]);
  

  /** ✅ 전체 선택 여부 */
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selected.has(k));

  /**
   * ✅ 부모로 올려보낼 draft 구성
   * - selectedIds는 “원래 id”로 구성(백엔드 전송 친화적)
   */
  const draft: DeliveryDraft = useMemo(() => {
    const selectedIds = normalizedRows
      .filter((r) => selected.has(r._key))
      .map((r) => r.id);

    return { selectedIds, deliverQtyById, deliveryDateById, warehouseById };
  }, [normalizedRows, selected, deliverQtyById, deliveryDateById, warehouseById]);

  /**
   * ✅ 상단(SalesManagement)과 연결되는 핵심 포인트
   * - draft가 바뀔 때마다 부모에 최신 상태 전달
   */
  useEffect(() => {
    onDraftChange?.(draft);
  }, [draft, onDraftChange]);

  /** 테이블 헤더 공통 클래스 */
  const thBaseClass = "bg-secondary text-white text-nowrap";

  /** 헤더를 데이터로 관리(정렬 옵션 포함) */
  const deliveryTableHeaders = [
    { label: "수주번호" },
    { label: "수주일자" },
    { label: "거래처" },
    { label: "품목코드" },
    { label: "품목명" },
    { label: "규격", align: "center" as const },
    { label: "수주수량", align: "right" as const },
    { label: "잔량", align: "right" as const },
    { label: "이번 납품수량" },
    { label: "납품일" },
    { label: "창고" },
    { label: "상태",align: "center" as const  },
    { label: "처리",align: "center" as const  },
  ];

  /** ✅ 전체 선택/해제 토글 */
  const toggleAll = () => {
    setSelected(() => {
      if (allSelected) return new Set(); // 전체 해제
      return new Set(allKeys); // 전체 선택
    });
  };

  /** ✅ 개별 행 선택 토글 */
  const toggleOne = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  /** ✅ 납품수량 입력(잔량 초과/음수 방지) */
  const setQty = (key: string, remainQty: number, valueRaw: string) => {
    const n = Number(valueRaw);
    const safe = Number.isFinite(n) ? n : 0;
    const clipped = Math.max(0, Math.min(remainQty, safe));
    setDeliverQtyById((prev) => ({ ...prev, [key]: clipped }));
  };

  /** ✅ 납품일 변경 */
  const setDate = (key: string, value: string) => {
    setDeliveryDateById((prev) => ({ ...prev, [key]: value }));
  };

  /** ✅ 창고 변경 */
  const setWh = (key: string, value: string) => {
    setWarehouseById((prev) => ({ ...prev, [key]: value }));
  };

  /** ✅ 납품수량 검증(0~잔량 범위인지) */
  const isInvalidQty = (deliverQty: number, remainQty: number) =>
    deliverQty < 0 || deliverQty > remainQty;

  /** ✅ API로 보낼 payload 구성 */
  const buildPayload = (r: (typeof normalizedRows)[number]) => {
    const deliverQty = r._deliverQty ?? 0;
    const deliveryDate = r._deliveryDate ?? today;
    const warehouse = r._warehouse ?? warehouses[0];
    return { id: r.id, deliverQty, deliveryDate, warehouse };
  };

   /** ✅ 선택된 행들의 payloads */
  const bulkPayloads = useMemo(() => {
    return normalizedRows
      .filter((r) => selected.has(r._key))
      .map(buildPayload)
      // 수량 0인 건 제외(원하면 여기 정책 바꿔도 됨)
      .filter((p) => p.deliverQty > 0);
  }, [normalizedRows, selected]);

  /** ✅ 행 단위 납품처리 */
  const handleProcessRow = async (r: (typeof normalizedRows)[number]) => {
    const payload = buildPayload(r);


        // 수량 검증
    if (payload.deliverQty <= 0) return;
    if (isInvalidQty(payload.deliverQty, r.remainQty)) return;

    await onProcessRow?.(payload);
  };

  // await api.post("/api/deliveries", {
  //   orderLineId,
  //   deliverQty: p.deliverQty,
  //   deliveryDate: p.deliveryDate,
  //   warehouse: p.warehouse,
  // });

  // ✅ 가장 안전: 해당 라인만 다시 불러오거나 전체 재조회
  // 빠르게 끝내려면 전체 재조회:
  // const res = await api.get("/api/sales/order-lines");
  // const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
  // 위 fetchLines와 동일한 mapped 로직으로 setLineRows(mapped)
// };



  /** ✅ 선택 일괄납품(상단 버튼) */
 const handleProcessBulk = async () => {
  if (bulkPayloads.length === 0) {
    alert("선택된 행의 납품수량/납품일/창고를 확인해줘!");
    return;
  }
   await onProcessBulk?.(bulkPayloads);
  };

  // // ✅ 순차 처리(실패 지점 파악 쉬움)
  // for (const p of bulkPayloads) {
  //   await api.post("/api/deliveries", {
  //     orderLineId: Number(p.id),
  //     deliverQty: p.deliverQty,
  //     deliveryDate: p.deliveryDate,
  //     warehouse: p.warehouse,
  //   });
  // }

  // ✅ 처리 후 재조회
  // fetchLines()를 함수로 빼서 재사용하면 베스트


  /** ✅ 합계(하단 합계) */
  const totals = useMemo(() => {
    const orderQtySum = normalizedRows.reduce((s, r) => s + (r.orderQty ?? 0), 0);
    const remainQtySum = normalizedRows.reduce((s, r) => s + (r.remainQty ?? 0), 0);

    const selectedDeliverSum = normalizedRows.reduce((s, r) => {
      if (!selected.has(r._key)) return s;
      return s + (r._deliverQty ?? 0);
    }, 0);

    return { orderQtySum, remainQtySum, selectedDeliverSum };
  }, [normalizedRows, selected]);

  return (
    <>
      {/* ✅ 탭 내부에서도 “선택 일괄납품” 실행 가능 */}
      <div className="d-flex justify-content-end mb-2">
        <Button
          variant="primary"
          size="sm"
          onClick={handleProcessBulk}
          disabled={selected.size === 0}
        >
          선택 일괄납품
        </Button>
      </div>

      <Table responsive className="align-middle">
        <thead>
          <tr>
            <th className={`${thBaseClass} text-center`}>
              <input type="checkbox" checked={allSelected} onChange={toggleAll} />
            </th>

           {deliveryTableHeaders.map((h, idx) => (
              <th
                key={idx}
                className={`${thBaseClass} ${
                  h.align === "right"
                    ? "text-end"
                    : h.align === "center"
                    ? "text-center"
                    : ""
                }`}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {normalizedRows.map((r) => {
            const invalid = isInvalidQty(r._deliverQty ?? 0, r.remainQty);
            const disableRowProcess = (r._deliverQty ?? 0) <= 0 || invalid;

            return (
              <tr key={r._key}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selected.has(r._key)}
                    onChange={() => toggleOne(r._key)}
                  />
                </td>

                <td className="text-nowrap">{r.orderNo}</td>
                <td className="text-nowrap">{r.orderDate}</td>
                <td className="text-nowrap">{r.customerName}</td>
                <td className="text-nowrap">{r.itemCode}</td>
                <td className="text-nowrap">{r.itemName}</td>
                <td className="text-center">{r.spec ?? "-"}</td>

                <td className="text-end">{(r.orderQty ?? 0).toLocaleString()}</td>
                <td className="text-end fw-semibold">{(r.remainQty ?? 0).toLocaleString()}</td>

                <td style={{ minWidth: 170 }}>
                  <input
                    type="number"
                    min={0}
                    max={r.remainQty}
                    value={r._deliverQty ?? 0}
                    onChange={(e) => setQty(r._key, r.remainQty, e.target.value)}
                    className={`form-control ${invalid ? "is-invalid" : ""}`}
                    placeholder="0"
                  />
                  {invalid && (
                    <div className="invalid-feedback">잔량({r.remainQty}) 이하로 입력</div>
                  )}
                </td>

                <td style={{ minWidth: 170 }}>
                  <input
                    type="date"
                    value={r._deliveryDate}
                    onChange={(e) => setDate(r._key, e.target.value)}
                    className="form-control"
                  />
                </td>

                <td style={{ minWidth: 140 }}>
                  <select
                    value={r._warehouse}
                    onChange={(e) => setWh(r._key, e.target.value)}
                    className="form-select"
                  >
                    {warehouses.map((wh) => (
                      <option key={wh} value={wh}>
                        {wh}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="text-nowrap">
                  <div className="d-flex align-items-center justify-content-center">
                  <StatusPill $status={r._status}>
                    {r._status}
                  </StatusPill>
                  </div>
                </td>

                <td className="text-nowrap">
                  <div className="d-flex align-items-center justify-content-center">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleProcessRow(r)}
                    disabled={disableRowProcess}
                  >
                    납품처리
                  </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <th className="bg-secondary text-white text-center" colSpan={7}>
              합계
            </th>
            <th className="bg-secondary text-warning fw-bold text-end">
              {totals.orderQtySum.toLocaleString()}
            </th>
            <th className="bg-secondary text-warning fw-bold text-end">
              {totals.remainQtySum.toLocaleString()}
            </th>
            <th className="bg-secondary text-warning fw-bold text-end">
              {totals.selectedDeliverSum.toLocaleString()}
            </th>
            <th className="bg-secondary text-white" colSpan={4}>
              &nbsp;
            </th>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
