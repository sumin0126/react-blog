/**
 * @description 컨펌 모달 컴포넌트
 *
 * @param title - 모달 타이틀
 * @param confirmText - 컨펌 텍스트
 * @param cancelText - 취소 텍스트
 * @param onClickConfirm - 컴펌 클릭 이벤트
 * @param onClickCancel - 취소 클릭 이벤트
 * @param modalClose - x버튼 클릭 이벤트
 */
const ConfirmModal = (props) => {
  const {
    title,
    confirmText,
    cancelText,
    onClickConfirm,
    onClickCancel,
    modalClose,
  } = props;

  return (
    <div className="modal">
      <div className="modal-popup">
        <div className="modal-header-wrapper">
          <p>알림</p>
          <i class="fa-solid fa-x" onClick={modalClose}></i>
        </div>
        <h3>{title}</h3>
        <div className="confirm-button-wrapper">
          <button className="confirm" onClick={onClickConfirm}>
            {confirmText}
          </button>
          <button className="cancel" onClick={onClickCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
