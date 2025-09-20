const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeBtn = document.getElementById('removeBtn');
const classifyBtn = document.getElementById('classifyBtn');
const btnText = document.getElementById('btnText');
const spinner = document.getElementById('spinner');
const resultsSection = document.getElementById('resultsSection');
const topPrediction = document.getElementById('topPrediction');
const allPredictions = document.getElementById('allPredictions');
const errorMessage = document.getElementById('errorMessage');
const breedsList = document.getElementById('breedsList');

let selectedFile = null;

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadSupportedBreeds();
});

function setupEventListeners() {
    uploadArea.addEventListener('click', () => imageInput.click());

    const browseLink = document.querySelector('.browse-link');
    if (browseLink) {
        browseLink.addEventListener('click', (e) => {
            e.stopPropagation();
            imageInput.click();
        });
    }

    imageInput.addEventListener('change', handleFileSelect);
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    removeBtn.addEventListener('click', removeImage);
    classifyBtn.addEventListener('click', classifyImage);
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) processFile(file);
}

function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = event.dataTransfer.files;
    if (files.length > 0) processFile(files[0]);
}

function processFile(file) {
    if (!file.type.startsWith('image/')) {
        showError('Please select a valid image file (JPG, PNG, JPEG)');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        showError('File size must be less than 10MB');
        return;
    }

    selectedFile = file;
    displayImagePreview(file);
    hideError();
}

function displayImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        previewImg.src = e.target.result;
        imagePreview.style.display = 'block';
        uploadArea.style.display = 'none';
        classifyBtn.disabled = false;
        hideResults();
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    selectedFile = null;
    imagePreview.style.display = 'none';
    uploadArea.style.display = 'block';
    classifyBtn.disabled = true;
    imageInput.value = '';
    hideResults();
    hideError();
}

async function classifyImage() {
    if (!selectedFile) {
        showError('Please select an image first');
        return;
    }

    setLoadingState(true);
    hideError();
    hideResults();

    try {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await fetch('/api/predict', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Classification failed');
        }

        displayResults(data);
    } catch (error) {
        console.error('Classification error:', error);
        showError(error.message || 'An error occurred during classification');
    } finally {
        setLoadingState(false);
    }
}

function setLoadingState(loading) {
    btnText.textContent = loading ? 'Classifying...' : 'Classify Breed';
    spinner.style.display = loading ? 'block' : 'none';
    classifyBtn.disabled = loading;
}

function displayResults(data) {
    const { top_prediction, all_predictions } = data;

    topPrediction.innerHTML = `
        <h3>${top_prediction.breed}</h3>
        <p>Confidence: ${formatConfidence(top_prediction.confidence)}</p>
        <div class="confidence-bar">
            <div class="confidence-fill" style="width: ${top_prediction.confidence * 100}%"></div>
        </div>
    `;

    allPredictions.innerHTML = all_predictions.map(pred => `
        <div class="prediction-item">
            <span class="prediction-name">${pred.breed}</span>
            <span class="prediction-confidence">${formatConfidence(pred.confidence)}</span>
        </div>
    `).join('');

    resultsSection.style.display = 'block';
}

function hideResults() {
    resultsSection.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

async function loadSupportedBreeds() {
    try {
        const response = await fetch('/api/breeds');
        const data = await response.json();

        if (data.breeds) {
            breedsList.innerHTML = data.breeds.map(breed =>
                `<span class="breed-tag">${breed}</span>`
            ).join('');
        }
    } catch (error) {
        console.error('Error loading breeds:', error);
        const fallbackBreeds = ['Mehsana', 'Murrah', 'Surti', 'Rathi', 'Sahiwal', 'Red_Sindhi', 'Tharparkar'];
        breedsList.innerHTML = fallbackBreeds.map(breed =>
            `<span class="breed-tag">${breed}</span>`
        ).join('');
    }
}

function formatConfidence(confidence) {
    return `${(confidence * 100).toFixed(1)}%`;
}

function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        processFile,
        validateImageFile,
        formatConfidence
    };
}
