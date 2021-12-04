import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

export default function Contacts({ value,control }) {
  /*
  const { register, handleSubmit, control, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  );
  */
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
    defaultValue: value,
  });

  return (
    <div>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        append
      </button>
      <input type="submit" />
    </div>
  );
}
