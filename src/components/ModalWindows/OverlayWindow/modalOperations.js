export function openModalfunc(dispatch, openModalType) {
  dispatch({ type: "OPEN_MODAL", payload: openModalType });
}
// onClick={() => openModalfunc(dispatch, "addUserWindow")

export function closeModalfunc(dispatch, closingModalType) {
  dispatch({ type: "CLOSE_MODAL", payload: closingModalType });
}
// onClick={() => closeModalfunc(dispatch, "addUserWindow")
