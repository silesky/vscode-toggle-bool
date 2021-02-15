import * as vscode from 'vscode';

type AnyMap = Record<string, unknown>;

function getUserMappingConfiguration(): AnyMap | undefined {
  const result = vscode.workspace
    .getConfiguration()
    .get('toggleboolean.mapping');
  if (result) {
    return JSON.parse(JSON.stringify(result));
  }
}

const findAndReplace = (textBlob: string, mapObj: AnyMap) => {
  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
  const textBlobWithReplacements = textBlob.replace(re, (matched) => {
    const isUpperCase = matched === matched.toUpperCase();
    const isFirstUpperCase =
      matched === matched.charAt(0).toUpperCase() + matched.slice(1);
    const currentItem = mapObj[matched.toLowerCase()] as any;
    if (currentItem === undefined) return matched; // unneccessary, but just to check.
    const match = (() => {
      if (isUpperCase) {
        return currentItem.toString().toUpperCase();
      } else if (isFirstUpperCase) {
        return (
          currentItem.toString().charAt(0).toUpperCase() +
          currentItem.toString().slice(1)
        );
      } else {
        return currentItem;
      }
    })();
    return match;
  });
  return textBlobWithReplacements;
};

export const swapText = (textBlob: string): string => {
  const boolMap = getUserMappingConfiguration();
  return boolMap ? findAndReplace(textBlob, boolMap) : textBlob;
};
