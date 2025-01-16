let formFields = [];
let editingIndex = null;

document
  .getElementById("fieldType")
  .addEventListener("change", showFieldOptions);

function showFieldOptions() {
  const fieldType = document.getElementById("fieldType").value;
  const fieldOptions = document.getElementById("fieldOptions");

  if (!fieldType) {
    fieldOptions.innerHTML = "";
    return;
  }

  let optionsHtml = `
          <div class="option-group">
              <label>Field Label</label>
              <input type="text" id="fieldLabel" placeholder="Enter field label">
          </div>
          <div class="option-group">
              <label>Field Name</label>
              <input type="text" id="fieldName" placeholder="Enter field name">
          </div>
          <div class="option-group">
              <label>
                  <input type="checkbox" id="required"> Required Field
              </label>
          </div>
      `;

  if (fieldType === "radio" || fieldType === "checkbox") {
    optionsHtml += `
              <div class="option-group">
                  <label>Options</label>
                  <div class="options-list" id="optionsList">
                      <div class="option-item">
                          <input type="text" placeholder="Option text">
                          <button class="btn btn-danger" onclick="removeOption(this)">
                              <i class="fas fa-times"></i>
                          </button>
                      </div>
                  </div>
                  <button class="btn btn-primary" onclick="addOption()">Add Option</button>
              </div>
          `;
  }

  optionsHtml += `
          <button class="btn btn-primary" onclick="addField()">
              ${editingIndex !== null ? "Update" : "Add"} Field
          </button>
      `;

  fieldOptions.innerHTML = optionsHtml;
}

function addOption() {
  const optionsList = document.getElementById("optionsList");
  const optionItem = document.createElement("div");
  optionItem.className = "option-item animate-fade";
  optionItem.innerHTML = `
          <input type="text" placeholder="Option text">
          <button class="btn btn-danger" onclick="removeOption(this)">
              <i class="fas fa-times"></i>
          </button>
      `;
  optionsList.appendChild(optionItem);
}

function removeOption(button) {
  button.parentElement.remove();
}

function addField() {
  const fieldType = document.getElementById("fieldType").value;
  const fieldLabel = document.getElementById("fieldLabel").value;
  const fieldName = document.getElementById("fieldName").value;
  const required = document.getElementById("required").checked;

  if (!fieldLabel || !fieldName) {
    alert("Please fill in all required fields");
    return;
  }

  const fieldData = {
    type: fieldType,
    label: fieldLabel,
    name: fieldName,
    required: required,
  };

  if (fieldType === "radio" || fieldType === "checkbox") {
    fieldData.options = Array.from(
      document.querySelectorAll("#optionsList input")
    )
      .map((input) => input.value)
      .filter((value) => value);

    if (fieldData.options.length === 0) {
      alert("Please add at least one option");
      return;
    }
  }

  if (editingIndex !== null) {
    formFields[editingIndex] = fieldData;
    editingIndex = null;
  } else {
    formFields.push(fieldData);
  }

  // Reset form
  document.getElementById("fieldType").value = "";
  document.getElementById("fieldOptions").innerHTML = "";

  renderPreview();
}

function renderPreview() {
  const previewForm = document.getElementById("previewForm");
  previewForm.innerHTML = "";

  formFields.forEach((field, index) => {
    const fieldDiv = document.createElement("div");
    fieldDiv.className = "preview-field animate-fade";

    const label = document.createElement("label");
    label.textContent = field.label;
    if (field.required) {
      label.innerHTML += '<span class="required-mark">*</span>';
    }

    const fieldActions = `
              <div class="field-actions">
                  <button class="action-btn edit-btn" onclick="editField(${index})">
                      <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn delete-btn" onclick="deleteField(${index})">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
          `;

    let inputHtml = "";
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        inputHtml = `
                      <input type="${field.type}" 
                             name="${field.name}" 
                             ${field.required ? "required" : ""}>
                  `;
        break;

      case "textarea":
        inputHtml = `
                      <textarea name="${field.name}" 
                                ${field.required ? "required" : ""}></textarea>
                  `;
        break;

      case "radio":
        inputHtml = field.options
          .map(
            (option) => `
                      <div class="radio-option">
                          <input type="radio" 
                                 name="${field.name}" 
                                 value="${option}"
                                 id="${field.name}_${option}"
                                 ${field.required ? "required" : ""}>
                          <label for="${field.name}_${option}">${option}</label>
                      </div>
                  `
          )
          .join("");
        inputHtml = `<div class="radio-group">${inputHtml}</div>`;
        break;

      case "checkbox":
        inputHtml = field.options
          .map(
            (option) => `
                      <div class="checkbox-option">
                          <input type="checkbox" 
                                 name="${field.name}" 
                                 value="${option}"
                                 id="${field.name}_${option}">
                          <label for="${field.name}_${option}">${option}</label>
                      </div>
                  `
          )
          .join("");
        inputHtml = `<div class="checkbox-group">${inputHtml}</div>`;
        break;
    }

    fieldDiv.innerHTML = fieldActions + label.outerHTML + inputHtml;
    previewForm.appendChild(fieldDiv);
  });
}

function editField(index) {
  const field = formFields[index];
  editingIndex = index;

  document.getElementById("fieldType").value = field.type;
  showFieldOptions();

  document.getElementById("fieldLabel").value = field.label;
  document.getElementById("fieldName").value = field.name;
  document.getElementById("required").checked = field.required;

  if (field.options) {
    const optionsList = document.getElementById("optionsList");
    optionsList.innerHTML = "";
    field.options.forEach((option) => {
      const optionItem = document.createElement("div");
      optionItem.className = "option-item";
      optionItem.innerHTML = `
                  <input type="text" value="${option}">
                  <button class="btn btn-danger" onclick="removeOption(this)">
                      <i class="fas fa-times"></i>
                  </button>
              `;
      optionsList.appendChild(optionItem);
    });
  }
}

function deleteField(index) {
  if (confirm("Are you sure you want to delete this field?")) {
    formFields.splice(index, 1);
    renderPreview();
  }
}

function exportForm() {
  const codePreview = document.getElementById("codePreview");
  let formHtml = "<form>\n";

  formFields.forEach((field) => {
    formHtml += `    <div class="form-field">\n`;
    formHtml += `        <label>${field.label}${
      field.required ? " *" : ""
    }</label>\n`;

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        formHtml += `        <input type="${field.type}" name="${field.name}" ${
          field.required ? "required" : ""
        }>\n`;
        break;

      case "textarea":
        formHtml += `        <textarea name="${field.name}" ${
          field.required ? "required" : ""
        }></textarea>\n`;
        break;

      case "radio":
        field.options.forEach((option) => {
          formHtml += `        <div class="radio-option">\n`;
          formHtml += `            <input type="radio" name="${
            field.name
          }" value="${option}" id="${field.name}_${option}" ${
            field.required ? "required" : ""
          }>\n`;
          formHtml += `            <label for="${field.name}_${option}">${option}</label>\n`;
          formHtml += `        </div>\n`;
        });
        break;

      case "checkbox":
        field.options.forEach((option) => {
          formHtml += `        <div class="checkbox-option">\n`;
          formHtml += `            <input type="checkbox" name="${field.name}" value="${option}" id="${field.name}_${option}">\n`;
          formHtml += `            <label for="${field.name}_${option}">${option}</label>\n`;
          formHtml += `        </div>\n`;
        });
        break;
    }

    formHtml += `    </div>\n`;
  });

  formHtml += "</form>";
  codePreview.value = formHtml;
}
