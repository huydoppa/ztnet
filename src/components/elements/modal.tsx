import cn from "classnames";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useModalStore } from "~/utils/store";
import { useTranslations } from "next-intl";

const Modal = () => {
  const t = useTranslations("modalLayout");
  const ref = useRef(null);
  const {
    isOpen,
    description,
    content,
    title,
    rootStyle,
    yesAction,
    toggleModal,
    disableClickOutside,
    closeModal,
  } = useModalStore((state) => state);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useOnClickOutside(ref, () => {
    if (!disableClickOutside) {
      closeModal();
    }
  });
  const actionHandler = () => {
    yesAction();
    toggleModal();
  };
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle z-20 ": true,
    "modal-open": isOpen,
  });

  return (
    // we add modal-bottom and modal-middle classes to make it responsive
    //add modal-open for now to test the modal
    <div className={modalClass}>
      {/* we want any content for this modal layout so we just pass the children */}
      <div
        className={cn(
          "custom-scrollbar modal-box relative bg-base-100",
          rootStyle
        )}
        ref={ref}
      >
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{description}</p>
        <div>{content}</div>
        <div className="modal-action">
          {yesAction ? (
            <>
              {/* closes the modal */}
              <button className="btn" onClick={actionHandler}>
                {t("yesButton")}
              </button>
              <button className="btn" onClick={closeModal}>
                {t("cancelButton")}
              </button>
            </>
          ) : (
            <button className="btn" onClick={closeModal}>
              {t("closeButton")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
