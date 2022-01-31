import React, { useCallback, useState } from "react";
import { Alert, Icon, Input, InputGroup } from "rsuite";

export default function EditableInput({
  initialValue,
  onSave,
  label = null,
  placeholder = "write your value",
  emptyMsg = "input is empty",
  ...inputProps
}) {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setEditable] = useState(false);
  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onSaveClick = async () => {
      const trimmed = input.trim();

      if(trimmed === '') {
          Alert.info(emptyMsg, 4000);
      }

      if(trimmed !== initialValue) {
          await onSave(trimmed); 
      }

      setEditable(false);
  };

  const onEditClick = useCallback(() => {
    setEditable((p) => !p);
    setInput(initialValue);
  }, [initialValue]);
  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          placeholder={placeholder}
          onChange={onInputChange}
          value={input}
          disabled={!isEditable}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? "close" : "edit2"} />
        </InputGroup.Button>
        {isEditable && 
            <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
            </InputGroup.Button>
        }
      </InputGroup>
    </div>
  );
}
