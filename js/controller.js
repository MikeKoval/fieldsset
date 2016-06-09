(function(codeWidget) {
    let isDigit = function(keyCode) {
        return (keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105);
    };

    let isDeleteKey = function(keyCode) {
        return keyCode == 46;
    };

    let isBackSpaceKey = function(keyCode) {
        return keyCode == 8;
    };

    let isLeftArrowKey = function(keyCode) {
        return keyCode == 37;
    };

    let isRightArrowKey = function(keyCode) {
        return keyCode == 39;
    };

    let isControlKey = function(keyCode) {
        return (
            isDeleteKey(keyCode) ||
            isBackSpaceKey(keyCode) ||
            isLeftArrowKey(keyCode) ||
            isRightArrowKey(keyCode)
        );
    };

    let addEventListeners = function() {
        for(let i = 0; i < codeWidget.controlsNumber; i += 1) {
            let v = codeWidget.controls[i];

            v.addEventListener('keydown', keyDownEventListener);
            v.addEventListener('keyup', keyUpEventListener);
            v.addEventListener('click', clickEventListener);
            v.addEventListener('focus', focusEventListener);
        }
    };

    let keyDownEventListener = function(event) {
        if(!isDigit(event.keyCode) && !isControlKey(event.keyCode)) {
            event.preventDefault();

            return;
        }
        else if(isControlKey(event.keyCode)) {
            if(codeWidget.currCtrlIndex > 0 &&
                codeWidget.currCursorPos == 0 &&
                isBackSpaceKey(event.keyCode)) {
                codeWidget.controls[codeWidget.currCtrlIndex - 1].focus();
            }

            if(codeWidget.currCtrlIndex < codeWidget.controlsNumber - 1 &&
                codeWidget.currCursorPos == codeWidget.controlSize &&
                isDeleteKey(event.keyCode)) {
                codeWidget.controls[codeWidget.currCtrlIndex + 1].focus();
                codeWidget.controls[codeWidget.currCtrlIndex].setSelectionRange(0, 0);
            }
        }
    };

    let keyUpEventListener = function(event) {
        if(!isDigit(event.keyCode) && !isControlKey(event.keyCode)) { //prevent typing not digits
            event.preventDefault();
            return;
        }

        let currentIndex = +this.getAttribute('data-index');

        codeWidget.currCtrlIndex = currentIndex;
        codeWidget.currCursorPos = this.selectionStart;

        if(isDigit(event.keyCode)) {
            if((codeWidget.currCtrlIndex < codeWidget.controlsNumber)) {
                if(codeWidget.currCursorPos >= codeWidget.controlSize) {
                    codeWidget.setCode(codeWidget.getCode());

                    if(codeWidget.controls[codeWidget.currCtrlIndex + 1]) {
                        codeWidget.controls[codeWidget.currCtrlIndex + 1].setSelectionRange(1, 1); //0, 0

                        codeWidget.controls[codeWidget.currCtrlIndex + 1].focus();

                    }
                }
                else if(this.value.length >= codeWidget.controlsNumber) {
                    codeWidget.setCode(codeWidget.getCode());
                    codeWidget.controls[codeWidget.currCtrlIndex].setSelectionRange(
                        codeWidget.currCursorPos,
                        codeWidget.currCursorPos
                    );
                }
            }
        }
        else if(isControlKey(event.keyCode)) {
            if(isBackSpaceKey(event.keyCode)) {
                codeWidget.setCode(codeWidget.getCode());
                codeWidget.controls[codeWidget.currCtrlIndex].setSelectionRange(
                    codeWidget.currCursorPos,
                    codeWidget.currCursorPos
                );

                if(this.value.length === 0 && codeWidget.controls[codeWidget.currCtrlIndex - 1]) {
                    codeWidget.controls[codeWidget.currCtrlIndex - 1].focus();
                }
            }

            if(isDeleteKey(event.keyCode)) {
                codeWidget.setCode(codeWidget.getCode());
                codeWidget.controls[codeWidget.currCtrlIndex].setSelectionRange(
                    codeWidget.currCursorPos,
                    codeWidget.currCursorPos
                );
            }

            if(isLeftArrowKey(event.keyCode) &&
                codeWidget.currCursorPos == 0 &&
                codeWidget.currCtrlIndex > 0) {
                codeWidget.controls[codeWidget.currCtrlIndex - 1].focus();
            }

            if(isRightArrowKey(event.keyCode) &&
                codeWidget.currCursorPos == codeWidget.controlSize &&
                codeWidget.currCtrlIndex < codeWidget.controlsNumber - 1) {
                codeWidget.controls[codeWidget.currCtrlIndex + 1].focus();
                codeWidget.controls[codeWidget.currCtrlIndex].setSelectionRange(0, 0);
            }
        }
    };

    let clickEventListener = function(event) {
        codeWidget.currCtrlIndex = +this.getAttribute('data-index');
        codeWidget.currCursorPos = this.selectionStart;
    };

    let focusEventListener = function(event) {
        codeWidget.currCtrlIndex = +this.getAttribute('data-index');
        codeWidget.currCursorPos = this.selectionStart;
    };

    addEventListeners();
})(codeWidget);