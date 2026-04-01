import { useId, useMemo, useState } from "react";
import {
  categoryOptions,
  dayOptions,
  priceLevelOptions,
  defaultImageUrl,
} from "../utils/activityOptions";

const emptyValues = {
  title: "",
  category: "",
  description: "",
  location: "",
  day: "Friday",
  priceLevel: "Budget",
};

function ActivityForm({ initialValues, isEditing, onSubmit, onCancel }) {
  const titleId = useId();
  const categoryId = useId();
  const locationId = useId();
  const dayId = useId();
  const priceId = useId();
  const descriptionId = useId();
  const startingValues = useMemo(
    () => ({
      ...emptyValues,
      ...initialValues,
    }),
    [initialValues]
  );

  const [formValues, setFormValues] = useState(startingValues);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!formValues.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!formValues.category.trim()) {
      nextErrors.category = "Category is required.";
    }

    if (!formValues.location.trim()) {
      nextErrors.location = "Location is required.";
    }

    if (!formValues.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      ...formValues,
      title: formValues.title.trim(),
      category: formValues.category.trim(),
      description: formValues.description.trim(),
      location: formValues.location.trim(),
      image: initialValues?.image || defaultImageUrl,
      notes: initialValues?.notes || "",
    });

    if (!isEditing) {
      setFormValues(emptyValues);
    }

    setErrors({});
  }

  return (
    <form className="activity-form" onSubmit={handleSubmit} aria-live="polite">
      <div className="form-grid">
        <label className="form-field">
          <span>Title</span>
          <input
            id={titleId}
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Live music at Fotografiska"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? `${titleId}-error` : undefined}
          />
          {errors.title ? <small id={`${titleId}-error`}>{errors.title}</small> : null}
        </label>

        <label className="form-field">
          <span>Category</span>
          <select
            id={categoryId}
            name="category"
            value={formValues.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? `${categoryId}-error` : undefined}
          >
            <option value="">Select category</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <small id={`${categoryId}-error`}>{errors.category}</small>
          ) : null}
        </label>

        <label className="form-field">
          <span>Location</span>
          <input
            id={locationId}
            type="text"
            name="location"
            value={formValues.location}
            onChange={handleChange}
            placeholder="Sodermalm"
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? `${locationId}-error` : undefined}
          />
          {errors.location ? (
            <small id={`${locationId}-error`}>{errors.location}</small>
          ) : null}
        </label>

        <label className="form-field">
          <span>Day</span>
          <select id={dayId} name="day" value={formValues.day} onChange={handleChange}>
            {dayOptions.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Price level</span>
          <select
            id={priceId}
            name="priceLevel"
            value={formValues.priceLevel}
            onChange={handleChange}
          >
            {priceLevelOptions.map((priceLevel) => (
              <option key={priceLevel} value={priceLevel}>
                {priceLevel}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field form-field--full">
          <span>Short description</span>
          <textarea
            id={descriptionId}
            name="description"
            rows="3"
            value={formValues.description}
            onChange={handleChange}
            placeholder="What is this event and why should someone go?"
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? `${descriptionId}-error` : undefined}
          />
          {errors.description ? (
            <small id={`${descriptionId}-error`}>{errors.description}</small>
          ) : null}
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="button button--primary">
          {isEditing ? "Update activity" : "Add activity"}
        </button>

        {isEditing ? (
          <button type="button" className="button button--secondary" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default ActivityForm;
