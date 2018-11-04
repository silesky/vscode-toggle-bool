export const swapText = (textBlob: string): string => {
  const findAndReplace = (textBlob, mapObj) => {
    const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
    const textBlobWithReplacements = textBlob.replace(re, matched => {
      const isUpperCase = matched === matched.toUpperCase();
      const isFirstUpperCase = matched === (matched.charAt(0).toUpperCase() + matched.slice(1));
      const currentItem = mapObj[matched.toLowerCase()];
      if (currentItem === undefined) return matched; // unneccessary, but just to check.
      const match = (() => {
        if (isUpperCase) {
          return currentItem.toString().toUpperCase();
        } else if (isFirstUpperCase) {
          return (currentItem.toString().charAt(0).toUpperCase() + currentItem.toString().slice(1));
        } else {
          return currentItem;
        }
      })();
      return match;
    });
    return textBlobWithReplacements;
  };

  const boolish = {
    true: false,
    false: true,
    0: 1,
    1: 0,
    yes: 'no',
    no: 'yes',
    on: 'off',
    off: 'on',
  };

  const swappedText = findAndReplace(textBlob, boolish);
  return swappedText; // re-capitalize
};
