# MultiEmailField

The `<MultiEmailField/>` is used when the user needs to enter multiple email addresses in to a single field. This is different from existing combobox implementations as the user is not drawing from a pre-existing list of addresses.

## Usage

The component is meant for use with the `useMultiEmailField` hook. For example:

```javascript
import MultiEmailField, { useMultiEmailField } from 'src/components/multiEmailField';

const MyComponent = () => {
  const {
    handleMultiEmailChange,
    handleMultiEmailKeyDownAndBlur,
    handleMultiEmailRemove,
    setMultiEmailError,
    setMultiEmailValue,
    setMultiEmailList,
    multiEmailValue,
    multiEmailList,
    multiEmailError
  } = useMultiEmailField();

  return (
    <form>
      <MultiEmailField
        id="multi-email-email-to"
        label="To:"
        name="emailTo"
        onChange={(e) => handleMultiEmailChange(e)}
        onKeyDownAndBlur={(e) => handleMultiEmailKeyDownAndBlur(e)}
        onRemoveEmail={handleMultiEmailRemove}
        error={multiEmailError}
        value={multiEmailValue}
        emailList={multiEmailList}
      />

      <button onClick={() => setMultiEmailValue('')}>Clear Value</button>

      <button onClick={() => setMultiEmailList([])}>Clear List</button>

      <button onClick={() => setMultiEmailError('')}>Clear Error</button>
    </form>
  );
}
```

