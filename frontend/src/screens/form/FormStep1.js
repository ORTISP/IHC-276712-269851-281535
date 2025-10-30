import React from "react";
import Card from "../../components/shared/Card";
import Input from "../../components/shared/Input";
import DatePicker from "../../components/formComponents/DatePicker";
import GenderSelector from "../../components/formComponents/GenderSelector";

const FormStep1 = ({
  name,
  setName,
  dateOfBirth,
  setDateOfBirth,
  gender,
  setGender,
}) => {
  return (
    <Card className="p-6">
      <Input
        label="Nombre"
        placeholder="Ingresa tu nombre completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <DatePicker
        label="Fecha de Nacimiento"
        value={dateOfBirth}
        onChange={setDateOfBirth}
      />

      <GenderSelector
        label="Género"
        value={gender}
        onChange={setGender}
        options={["Masculino", "Femenino", "Otro"]}
      />
    </Card>
  );
};

export default FormStep1;
