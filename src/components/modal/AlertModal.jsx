/**
 * @description 알림 모달 컴포넌트
 *
 * @param title - 모달 타이틀
 * @param completeText - 완료 텍스트
 * @param onClickComplete - 완료 클릭 이벤트
 */
const AlertModal = (props) => {
  const { title, completeText, onClickComplete } = props;

  return (
    <div className="modal">
      <div className="modal-popup">
        <div className="modal-header-wrapper">
          <h3>{title}</h3>
          <i class="fa-solid fa-x"></i>
        </div>
        <div className="button-wrapper">
          <button className="complete" onClick={onClickComplete}>
            {completeText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
