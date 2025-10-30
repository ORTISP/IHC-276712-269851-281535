import Card from "../../components/shared/Card";
import SelectField from "../../components/formComponents/SelectField";
import MultiSelectField from "../../components/formComponents/MultiSelectField";
import ToggleButton from "../../components/formComponents/ToggleButton";

const FormStep2 = ({
  dietType,
  setDietType,
  restrictions,
  setRestrictions,
  nutritionalObjective,
  setNutritionalObjective,
  privateRecipes,
  setPrivateRecipes,
  dietTypes,
  restrictionsOptions,
  nutritionalObjectives,
}) => {
  return (
    <Card className="p-6">
      <SelectField
        label="Tipo de Dieta"
        value={dietType}
        options={dietTypes}
        onChange={setDietType}
        placeholder="Selecciona tu tipo de dieta"
      />

      <MultiSelectField
        label="Restricciones o Alergias"
        value={restrictions}
        options={restrictionsOptions}
        onChange={setRestrictions}
        placeholder="Selecciona tus restricciones o alergias"
      />

      <SelectField
        label="Objetivo Nutricional"
        value={nutritionalObjective}
        options={nutritionalObjectives}
        onChange={setNutritionalObjective}
        placeholder="Selecciona tu objetivo nutricional"
      />

      <ToggleButton
        label="Recetas Privadas"
        value={privateRecipes}
        onValueChange={setPrivateRecipes}
      />
    </Card>
  );
};

export default FormStep2;
