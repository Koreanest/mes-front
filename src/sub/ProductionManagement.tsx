import React, { useEffect, useState } from "react";
import Lnb from "../include/Lnb";
import Top from "../include/Top";
import { Wrapper, DflexColumn,  Content, Ctap } from "../styled/Sales.styles";
import { Container, Row, Col, Table, Button, Modal, Form, Pagination } 
from "react-bootstrap";
import { Center, Dflex, PageTotal, SpaceBetween } from "../styled/Component.styles";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import api from "../api";




type ProductionStatus = "WAIT" | "IN_PROGRESS" | "DONE" | "CANCELLED";


export const STATUS_LABEL: Record<ProductionStatus, string> = {
  WAIT: "대기",
  IN_PROGRESS: "진행",
  DONE: "완료",
  CANCELLED: "취소",
};

// =====================
// 타입(서버 응답 구조)

// =====================
// 생산지시 1건(상세조회/수정/삭제까지 하려면 id가 필요)
type ProductionOrder={//변수 자료형 생산 지시서 한건의 정보 구조를 정의. 서버/도메인 기준 타입
    id: number;
    orderDate:string; 
    workOrderNo: string; 
    itemCode:string; 
    itemName: string;
    planQty:number;
    startDate:string;
    endDate:string;
    status:ProductionStatus;
    remark?: string; // 서버에 있으면 확장 가능(없으면 제거해도 됨)
}

// Spring Page 형태(페이징 목록 응답)
type PageResponse<T>={//목록 데이터를 페이지 단위로 받을 때 쓰는 공통 형식 <T> 아무타입이나 들어올 수 있는 자리
 content:T[]; 
 totalElements:number;
 totalPages:number;
 number:number;// 현재 페이지(0-base)
 size:number;

}



// 테이블 헤더(렌더링/엑셀에 같이 사용)
const TABLE_HEADERS = [
  { key: "orderDate", label: "지시일" },
  { key: "workOrderNo", label: "지시번호" },
  { key: "itemCode", label: "품목코드" },
  { key: "itemName", label: "품목명" },
  { key: "planQty", label: "계획수량" },
  { key: "startDate", label: "시작일" },
  { key: "endDate", label: "종료일" },
  { key: "status", label: "상태" },
] as const;


const ProductionManagement = () => {



const [statusLoading, setStatusLoading] = useState(false); // 상태 변경 전용
const [saving, setSaving] = useState(false);               // 수정 저장
const [deleting, setDeleting] = useState(false);           // 삭제


const [confirmAction, setConfirmAction] = useState<null | {
  id: number;
  action: "start" | "complete" | "cancel";
   
}>(null);

type UndoInfo = {
  id: number;
  timer?: ReturnType<typeof setTimeout>;
};

const [undoInfo, setUndoInfo] = useState<UndoInfo | null>(null);

// ✅ [토스트 띄우기 로직] setUndoInfo 직접 호출은 여기서만!
const showUndoToast = (id: number) => {
  setUndoInfo((prev) => {
    if (prev?.timer) clearTimeout(prev.timer);
    return prev;
  });

  const timer = setTimeout(() => setUndoInfo(null), 10000);
  setUndoInfo({ id, timer });
};

// ✅ (선택) 모달 닫힐 때 토스트도 같이 정리하고 싶으면
const closeUndoToast = () => {
  setUndoInfo((prev) => {
    if (prev?.timer) clearTimeout(prev.timer);
    return null;
  });
};
  // =====================
  // 목록/페이징 상태
  // =====================

    const[rows, setRows] = useState<ProductionOrder[]>([]);
    //서버에서 받아온 생산지시 데이터를 화면에 뿌리기위해

    const[page, setPage] = useState(0);
    //페이지 이동(다음/이전)을 하기 위해

    const[size] = useState(10);
    //한 페이지에 보여줄 개수 서버에 "10개씩 주세요"라고 요청하기 위해

    const[totalPages, setTotalPages]= useState(0);
    //마지막 페이지인지 판단 페이지 버튼(1,2,3...)만들 때 필요

  // =====================
  // 등록 모달 상태
  // =====================

    const [showCreate, setShowCreate]= useState(false);
    //등록화면(모달/폼) 보여줄지 말지

     // 등록용 입력 폼(문자열로 받아두고 저장할 때 숫자 변환)
    const[form, setForm] = useState({//프론트 입력용 form 상태
        orderDate:"",
        itemCode:"",
        itemName:"",
        planQty:"",
        startDate:"",
        endDate:"",
        workOrderNo:"",
              
    })
    


    
    
  // =====================
  // 상세/수정/삭제 모달 상태 (쌤 코드 핵심 기능)
  // =====================
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState<ProductionOrder | null>(null);

  // 수정용 폼(상세 열었을 때 selected 값으로 채워짐)
  const [editForm, setEditForm] = useState({
    orderDate: "",
    workOrderNo: "",
    itemCode: "",
    itemName: "",
    planQty: "",
    startDate: "",
    endDate: "",
    status: "WAIT" as ProductionStatus,
    remark: "",
  });


  // =====================
  // 공통 입력 핸들러(등록 폼)
  // =====================
    //사용자가 입력 중인 생산지시 데이터 입력값을 저장, 입력 중에도 값 유지, 저장 버튼 클릭 시 서버로 전송 

    const handleChange= (e:React.ChangeEvent<any>)=>{//input 값이 바뀔떄 실행되는 함수 e는 무슨 입력창이 어떤 값으로 바뀌었는지에 대한 정보
        const {name,value}=e.target;//입력창(name)에 맞는 form값을 value로 바꿔주는 공용함수
        setForm((prev)=>({...prev, [name]:value}));//prev: 기존에 입력되어있던 form값 ...prev: 기존값은 그대로 복사 [name]:value :바뀐 입력값만 덮어쓰기
    }

/* 생산 지시 목록 조회: 생산 지시 목록을 서버에서 가져오는 함수
1. useEffect가 최초 1회만 실행: 화면 열자마자 자동으로 생산지시 목록 조회
2. fetchOrders() 호출
3. p 값은 pages 상태값을 기본값으로 사용
4. 서버에서 페이지 데이터 수신
5. rows / pages / totalPages 상태 갱신
*/

  // =====================
  // 목록 조회(페이지네이션)
  // =====================
  const fetchOrders = async (p: number) => {
    try {
      // ✅ fetch 대신 api.get 사용 → Authorization 자동 첨부됨(403 문제 예방)
      const res = await api.get<PageResponse<ProductionOrder>>("/api/production/orders", {
        params: { page: p, size },
      });

      const data = res.data;

      setRows(data.content ?? []);  
      setTotalPages(data.totalPages ?? 0);
    } catch (err) {
      console.error("생산지시 목록 조회 실패", err);
      setRows([]);
      setTotalPages(0);
    }
  };

    // 화면 진입 시 + page 변경 시 재조회(쌤은 [page]로 했고, 너는 최초 1회 fetchOrders(0) 스타일이었음)
  useEffect(() => {
     fetchOrders(page);    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


 // ✅ [추가됨] 페이지 이동 함수(쌤 코드)
  // 왜 필요? -> Prev/Next/번호 클릭에서 page 범위(0~totalPages-1) 밖으로 나가지 않게 보정해야 함
  const goPage = (p: number) => {
    const next = Math.max(0, Math.min(p, totalPages - 1));
    setPage(next);// ✅ page 바뀌면 useEffect가 fetchOrders(next) 실행
     };


   // =====================
  // 엑셀 다운로드(너 코드 유지 + 쌤 구조)
  // =====================
  // 왜 필요? -> XLSX만 import해도 "다운로드"는 브라우저 파일 저장 단계가 따로 필요해서 saveAs(blob)가 필수

  const handleExcelDownload = () => {
    const headerLabels = TABLE_HEADERS.map((h) => h.label);

    // 2차원 배열(AOA) 형태로 만들어서 엑셀 시트로 변환
    const excelData: (string | number)[][] = [
      ["#", ...headerLabels],
      ...(rows || []).map((row, idx) => [
        idx + 1 + page * size,
        row.orderDate,
        row.workOrderNo,
        row.itemCode,
        row.itemName,
        row.planQty,
        row.startDate,
        row.endDate,
        row.status,
      ]),
    ];

  const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "생산관리");

    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelFile], { type: "application/octet-stream" });
    saveAs(blob, "생산관리_리스트.xlsx");
  };


  // =====================
  // 등록(POST) - 너 방식(api.post)
  // =====================
 /*생산 지시 등록*/
const handleSave = async() =>{//저장버튼 클릭시 실행되는 함수
 try {
        const newWorkOrderNo = form.workOrderNo?.trim()
        ? form.workOrderNo.trim()
        : `WO-${Date.now()}`;

// 서버로 보낼 payload 구성
       const payload = {
      ...form,
      workOrderNo: newWorkOrderNo,
      planQty: Number(form.planQty),
      // status: form.status ?? "WAIT",
  
      };

    // ✅ fetch 대신 api.post 사용 (토큰 자동 첨부)
    await api.post("/api/production/orders", payload);
  
    // 등록 모달 닫기
    setShowCreate(false);

     // 첫 페이지로 이동 + 목록 갱신
    setPage(0);
        // page가 0이라도 안전하게 즉시 갱신하고 싶으면 아래 한 줄 유지(선택)
    fetchOrders(0);
  } catch (err) {
    console.error("생산지시 등록 실패", err);
  }
};
  // =====================
  // 상세 열기(쌤 코드 핵심) - api.get로 변경
  // =====================
const openDetail = async (id: number) => {
    try {
      const res = await api.get<ProductionOrder>(`/api/production/orders/${id}`);
      const data = res.data;

      setSelected(data);

      // ✅ 수정폼에 미리 채워 넣기(값 없을 때 대비)
      setEditForm({
        orderDate: data.orderDate ?? "",
        workOrderNo: data.workOrderNo ?? "",
        itemCode: data.itemCode ?? "",
        itemName: data.itemName ?? "",
        planQty: String(data.planQty ?? ""),
        startDate: data.startDate ?? "",
        endDate: data.endDate ?? "",
        status: (data.status ?? "WAIT") as ProductionStatus,
        remark: (data as any).remark ?? "",
      });

      setShowDetail(true);
    } catch (err) {
      console.error("상세 조회 실패", err);
    }
  };
 // =====================
  // 수정(PUT) - api.put로 변경
  // =====================
  const handleUpdate = async () => {
  if (!selected || saving) return;


try {
    setSaving(true);
    const { status, ...rest } = editForm; // ✅ status 제거

      
      const payload = {
        ...rest,
        planQty: Number(editForm.planQty),
      };

      await api.put(`/api/production/orders/${selected.id}`, payload);

      setShowDetail(false);

      // 수정 반영 위해 현재 페이지 재조회
      fetchOrders(page);
    } catch (err) {
      console.error("수정 실패", err);
    }finally {
    setSaving(false); // ✅ 이게 없어서 영구 “저장중” 됨
  }
};
  // =====================
  // 삭제(DELETE) - api.delete로 변경
  // =====================
  const handleDelete = async () => {
    if (!selected) return;
     if (deleting) return;

    const ok = window.confirm("정말 삭제 할까요?");
    if (!ok) return;

    try {
      setDeleting(true);
      await api.delete(`/api/production/orders/${selected.id}`);

      setShowDetail(false);

      // 삭제 후 현재 페이지 재조회
      fetchOrders(page);
    } catch (err) {
      console.error("삭제 실패", err);
    } finally {
    setDeleting(false);
  }
};

const changeStatus = async (
  id: number,
  action: "start" | "complete" | "cancel"
) => { 
  if (statusLoading) return; // ✅ 연타 방지(2중 클릭 차단)


  try{
    setStatusLoading(true);// 🔄 로딩 시작    

const res = await api.post<ProductionOrder>(
    `/api/production/orders/${id}/${action}`
  );

const updated = res.data;

 // ✅ 상세 모달 즉시 반영
    setSelected(updated);
    setEditForm((prev) => ({
      ...prev,
      status: updated.status,
      // 서버에서 다른 값도 같이 바뀔 수 있으니 안전하게 동기화(선택)
      orderDate: updated.orderDate ?? prev.orderDate,
      itemCode: updated.itemCode ?? prev.itemCode,
      itemName: updated.itemName ?? prev.itemName,
      planQty: String(updated.planQty ?? prev.planQty),
      startDate: updated.startDate ?? prev.startDate,
      endDate: updated.endDate ?? prev.endDate,
      remark: (updated as any).remark ?? prev.remark,
    }));

        // ✅ 목록도 즉시 갱신
    fetchOrders(page);

    
   showUndoToast(id);

  } catch (err) {
    console.error("상태 변경 실패", err);
    alert("상태 변경 실패");
  } finally {
    setStatusLoading(false);
  }
};


// undo 실행 함수 추가
const undoStatus = async (id: number) => {
  try {
    const res = await api.post<ProductionOrder>(`/api/production/orders/${id}/undo`);
    const updated = res.data;

    setSelected(updated);
    setEditForm((prev) => ({
      ...prev,
      status: updated.status,
      orderDate: updated.orderDate ?? prev.orderDate,
      itemCode: updated.itemCode ?? prev.itemCode,
      itemName: updated.itemName ?? prev.itemName,
      planQty: String(updated.planQty ?? prev.planQty),
      startDate: updated.startDate ?? prev.startDate,
      endDate: updated.endDate ?? prev.endDate,
      remark: (updated as any).remark ?? prev.remark,
    }));

    fetchOrders(page);
  } catch (err) {
    console.error("Undo 실패", err);
    alert("되돌리기 실패(시간 만료 또는 기록 없음)");
  }
};


const canStart = (s: ProductionStatus) => s === "WAIT";
const canComplete = (s: ProductionStatus) => s === "IN_PROGRESS";
const canCancel = (s: ProductionStatus) => s === "WAIT" || s === "IN_PROGRESS";


    return(
<>
 <Wrapper>
      <Lnb />
      <DflexColumn>
        <Content>
          <Top />
        </Content>

        <Container fluid className="p-0">
              <Row>
            <Col>
              <Ctap>
                <SpaceBetween>
            <h4>생산관리</h4>
               <Dflex>
                    <Button className="mx-2 my-3" onClick={handleExcelDownload} variant="success">
                      엑셀다운로드
                    </Button>
            <Button className="mb-3" onClick={()=> setShowCreate(true)}>
                생산지시등록
            </Button>
              </Dflex>
            </SpaceBetween>
              {/* =====================
                    목록 테이블
                    - 지시번호(workOrderNo) 클릭 시 상세 열기(쌤 기능)
                    ===================== */}

                    <Table bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>#</th>
                      {TABLE_HEADERS.map((h) => (
                        <th key={h.key}>{h.label}</th>
                      ))}
                       
                    </tr>
                  </thead>

                    <tbody>
                        {rows.map((r,i)=>(
                        <tr key={r.id} className="text-center">
                      <td>{i + 1 + page * size}</td>    
                        <td>{r.orderDate}</td>
                           {/* ✅ 클릭 가능한 링크 스타일로 상세 오픈 */}
                        <td>
                          <span
                            style={{
                              cursor: "pointer",
                              color: "#0d6efd",
                              textDecoration: "underline",
                            }}
                            onClick={() => openDetail(r.id)}
                            title="상세보기"
                          >
                            {r.workOrderNo}
                          </span>
                        </td>
                        <td>{r.itemCode}</td>
                        <td>{r.itemName}</td>
                        <td>{r.planQty}</td>
                        <td>{r.startDate}</td>
                        <td>{r.endDate}</td>
                        <td>{STATUS_LABEL[r.status] ?? r.status}</td>
                        
                        </tr>  
                        ))}
                        </tbody>
                        </Table>   

                      {/* =====================
                      페이지네이션
                      ===================== */}
                        <Center>                          
                              {totalPages > 0 && (
                    <Pagination>
                      <Pagination.First disabled={page === 0} onClick={() => goPage(0)} />
                      <Pagination.Prev disabled={page === 0} onClick={() => goPage(page - 1)} />

                      {Array.from({ length: totalPages })
                        .map((_, i) => i)
                        .filter((i) => i >= page - 2 && i <= page + 2)
                        .map((i) => (
                          <Pagination.Item key={i} active={i === page} onClick={() => goPage(i)}>
                            {i + 1}
                          </Pagination.Item>
                        ))}

                      <Pagination.Next disabled={page >= totalPages - 1} onClick={() => goPage(page + 1)} />
                      <Pagination.Last disabled={page >= totalPages - 1} onClick={() => goPage(totalPages - 1)} />
                    </Pagination>
                  )}

                  {/* ✅ [추가됨] 페이지 요약(쌤 코드) */}
                  <PageTotal>
                    총 {rows.length}건 {page + 1} / {totalPages} 페이지
                  </PageTotal>
                </Center>

                           

{/* 생산지시 등록 모달 */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>생산지시 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <Form>
            <Form.Control className="mb-2" type="date" name="orderDate" value={form.orderDate} onChange={handleChange} />
            <Form.Control className="mb-2" name="itemCode" placeholder="품목코드" value={form.itemCode} onChange={handleChange} />
            <Form.Control className="mb-2" name="itemName" placeholder="품목명"  value={form.itemName} onChange={handleChange} />
            <Form.Control className="mb-2" type="number" name="planQty" placeholder="계획수량" value={form.planQty} onChange={handleChange} />
            <Form.Control className="mb-2" type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            <Form.Control className="mb-2" type="date" name="endDate"  value={form.endDate} onChange={handleChange} />

              {/* ✅ [추가됨] workOrderNo 입력칸(쌤 코드에 있었음)
                          왜 있어야 함? -> "자동 생성"이더라도, 화면에서 확인/수정 입력이 필요한 설계일 수 있어서 폼에 남겨둠 */}
                      <Form.Control
                        className="mb-2"
                        name="workOrderNo"
                        placeholder="지시번호 (자동 생성 또는 입력)"
                         value={form.workOrderNo}
                        onChange={handleChange}
                      />
                      </Form>
                    
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={handleSave}>저장</Button>
                    </Modal.Footer>
                </Modal>

                 {/* =====================
                    상세/수정 모달 (쌤 코드 기능 이식)
                    ===================== */}
                <Modal show={showDetail} 
                onHide={() => {
                  setShowDetail(false);
                   setStatusLoading(false);
                    setSaving(false);
                    setDeleting(false);
                }} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>생산지시 상세</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                     {statusLoading && (
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>
                        상태 변경 처리 중…
                      </div>
                    )}
                    <Form>
                      <Form.Control
                        className="mb-2"
                        type="date"
                        name="orderDate"
                        value={editForm.orderDate}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, orderDate: e.target.value }))
                        }
                      />

                      {/* 지시번호는 보통 변경 막는 게 안전(쌤 코드 유지) */}
                      <Form.Control className="mb-2" name="workOrderNo" value={editForm.workOrderNo} disabled />

                      <Form.Control
                        className="mb-2"
                        name="itemCode"
                        placeholder="품목코드"
                        value={editForm.itemCode}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, itemCode: e.target.value }))
                        }
                      />

                      <Form.Control
                        className="mb-2"
                        name="itemName"
                        placeholder="품목명"
                        value={editForm.itemName}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, itemName: e.target.value }))
                        }
                      />

                      <Form.Control
                        className="mb-2"
                        name="planQty"
                        placeholder="계획수량"
                        value={editForm.planQty}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, planQty: e.target.value }))
                        }
                      />

                      <Form.Control
                        className="mb-2"
                        type="date"
                        name="startDate"
                        value={editForm.startDate}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, startDate: e.target.value }))
                        }
                      />

                      <Form.Control
                        className="mb-2"
                        type="date"
                        name="endDate"
                        value={editForm.endDate}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, endDate: e.target.value }))
                        }
                      />

                          <div className="mb-2">
                          <div style={{ fontWeight: 700, marginBottom: 6 }}>
                            상태: {STATUS_LABEL[editForm.status] ?? editForm.status}
                          </div>
                          <div style={{ opacity: statusLoading ? 0.6 : 1 }}>
                          <div>
                            <Button 
                             type="button"
                              size="sm"
                              variant="outline-primary"
                              className="me-1"
                              disabled={statusLoading || !canStart(editForm.status)}
                              onClick={() =>
                                selected &&
                                setConfirmAction({ id: selected.id, action: "start" })
                              }
                            >
                              {statusLoading ? "처리중..." : "시작"}
                            </Button>

                            <Button
                             type="button"
                              size="sm"
                              variant="outline-success"
                              className="me-1"
                              disabled={statusLoading || !canComplete(editForm.status)}
                              onClick={() =>
                                selected &&
                                setConfirmAction({ id: selected.id, action: "complete" })
                              }
                            >
                              {statusLoading ? "처리중..." : "완료"}
                            </Button>

                            <Button
                            type="button"
                              size="sm"
                              variant="outline-danger"
                              disabled={statusLoading || !canCancel(editForm.status)}
                              onClick={() =>
                                selected &&
                                setConfirmAction({ id: selected.id, action: "cancel" })
                              }
                            >
                              {statusLoading ? "처리중..." : "취소"}
                            </Button>
                            </div>
                          </div>
                        </div>

                      {/* remark가 서버에 있으면 사용, 없으면 이 입력칸은 삭제해도 됨 */}
                      <Form.Control
                        className="mb-2"
                        name="remark"
                        placeholder="비고(선택)"
                        value={editForm.remark}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, remark: e.target.value }))
                        }
                      />
                    </Form>
                    </Modal.Body>

                  <Modal.Footer>
                   <Button type="button" variant="danger" onClick={handleDelete} disabled={deleting}>
                    {deleting ? "삭제중..." : "삭제"}
                  </Button>
                  <Button type="button" variant="success" onClick={handleUpdate} disabled={saving}>
                      {saving ? "저장중..." : "수정 저장"}
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal
                show={!!confirmAction}
                onHide={() => setConfirmAction(null)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>상태 변경 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  정말 {confirmAction?.action === "start" ? "시작" : confirmAction?.action === "complete" ? "완료" : "취소"}
                  처리할까요?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setConfirmAction(null)}>
                    아니오
                  </Button>
                  <Button
                    variant="primary"
                    disabled={statusLoading}
                    onClick={async () => {
                      if (!confirmAction) return;
                      const { id, action } = confirmAction;
                      setConfirmAction(null);

                      // ✅ 즉시 반영 + 서버 반영
                      await changeStatus(id, action);
                     
                    }}
                  >
                    예
                  </Button>
                </Modal.Footer>
              </Modal>


                </Ctap>
              </Col>
              </Row>
              </Container>
              </DflexColumn>
              </Wrapper>
          {undoInfo && (
            <div style={{
              position: "fixed",
              right: 16,
              bottom: 16,
              background: "#fff",
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 10,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              zIndex: 9999,
              minWidth: 220
            }}>
              <div style={{ fontSize: 13, marginBottom: 10 }}>
                상태가 변경되었습니다. (되돌리기 가능)
              </div>

              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => {
                    if (undoInfo.timer) clearTimeout(undoInfo.timer);
                    setUndoInfo(null);
                  }}
                >
                  닫기
                </Button>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={async () => {
                    const id = undoInfo.id;
                    if (undoInfo.timer) clearTimeout(undoInfo.timer);
                    setUndoInfo(null);
                    await undoStatus(id);
                  }}
                >
                  Undo
                </Button>
              </div>
            </div>
          )}
          </>


    );
};

export default ProductionManagement;

