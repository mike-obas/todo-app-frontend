const isEmpty = (string) => {
  if (!string.trim()) return true;
  else return false;
};

//checkNoteInputs
export function checkNoteInputs(data) {
  let checkErrors = {};
  if (isEmpty(data.title)) {
    checkErrors.title = "Must not be empty";
  }
  if (isEmpty(data.description)) {
    checkErrors.description = "Must not be empty";
  }
  return {
    checkErrors,
    valid: Object.keys(checkErrors).length === 0 ? true : false,
  };
}
