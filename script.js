// Traffic Flow Prediction Demo JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hourSlider = document.getElementById('hour-slider');
    const currentHourDisplay = document.getElementById('current-hour');
    const daySelect = document.getElementById('day-select');
    const predictBtn = document.getElementById('predict-btn');
    const trafficVolumeDisplay = document.getElementById('traffic-volume');
    const resultSection = document.getElementById('result-section');

    // Traffic patterns data (simplified model)
    const trafficPatterns = {
        // Hourly multipliers (0-23 hours)
        hourlyMultipliers: [
            0.3, 0.2, 0.15, 0.1, 0.15, 0.4, 0.8, 1.2, 1.5, 1.3, 1.1, 1.0,
            1.1, 1.2, 1.3, 1.4, 1.6, 1.8, 1.5, 1.2, 0.9, 0.7, 0.5, 0.4
        ],
        // Day of week multipliers
        dayMultipliers: {
            monday: 1.0,
            tuesday: 1.1,
            wednesday: 1.15,
            thursday: 1.2,
            friday: 1.3,
            saturday: 0.8,
            sunday: 0.6
        }
    };

    // Base traffic volume
    const baseTrafficVolume = 150;

    // Update hour display when slider changes
    hourSlider.addEventListener('input', function() {
        currentHourDisplay.textContent = this.value;
        updateSliderTrack();
    });

    // Update slider track color based on position
    function updateSliderTrack() {
        const value = hourSlider.value;
        const percentage = (value / 23) * 100;
        hourSlider.style.background = `linear-gradient(to right, #dc3545 0%, #dc3545 ${percentage}%, #e9ecef ${percentage}%, #e9ecef 100%)`;
    }

    // Predict traffic function
    function predictTraffic() {
        const hour = parseInt(hourSlider.value);
        const day = daySelect.value;

        // Calculate predicted traffic volume
        const hourMultiplier = trafficPatterns.hourlyMultipliers[hour];
        const dayMultiplier = trafficPatterns.dayMultipliers[day];
        
        // Add some randomness to make it more realistic
        const randomFactor = 0.8 + (Math.random() * 0.4); // Random between 0.8 and 1.2
        
        const predictedVolume = Math.round(
            baseTrafficVolume * hourMultiplier * dayMultiplier * randomFactor
        );

        // Update the display with animation
        animateVolumeChange(predictedVolume);
    }

    // Animate the volume change
    function animateVolumeChange(newVolume) {
        const currentVolume = parseInt(trafficVolumeDisplay.textContent);
        const difference = newVolume - currentVolume;
        const steps = 20;
        const stepSize = difference / steps;
        let currentStep = 0;

        // Add loading state
        predictBtn.textContent = 'Predicting...';
        predictBtn.disabled = true;

        const animationInterval = setInterval(() => {
            currentStep++;
            const displayVolume = Math.round(currentVolume + (stepSize * currentStep));
            trafficVolumeDisplay.textContent = displayVolume;

            if (currentStep >= steps) {
                clearInterval(animationInterval);
                trafficVolumeDisplay.textContent = newVolume;
                
                // Reset button
                predictBtn.textContent = 'Predict Traffic';
                predictBtn.disabled = false;

                // Add success animation to result box
                const resultBox = document.querySelector('.result-box');
                resultBox.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    resultBox.style.transform = 'scale(1)';
                }, 200);
            }
        }, 30);
    }

    // Predict button click handler
    predictBtn.addEventListener('click', function() {
        predictTraffic();
    });

    // Header button interactions
    document.querySelector('.share-btn').addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'Traffic Flow Prediction Demo',
                text: 'Check out this traffic flow prediction demo!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    });

    document.querySelector('.star-btn').addEventListener('click', function() {
        this.style.color = this.style.color === 'gold' ? '#6c757d' : 'gold';
    });

    document.querySelector('.edit-btn').addEventListener('click', function() {
        alert('Edit functionality would be implemented here');
    });

    document.querySelector('.github-btn').addEventListener('click', function() {
        window.open('https://github.com', '_blank');
    });

    document.querySelector('.menu-btn').addEventListener('click', function() {
        alert('Menu options would be displayed here');
    });

    // Manage app button
    document.querySelector('.manage-app-btn').addEventListener('click', function() {
        alert('App management interface would be displayed here');
    });

    // Initialize slider track
    updateSliderTrack();

    // Auto-predict on page load
    setTimeout(() => {
        predictTraffic();
    }, 500);

    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.target !== predictBtn) {
            predictTraffic();
        }
    });

    // Add smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .result-box {
            transition: transform 0.2s ease, background-color 0.3s ease;
        }
        
        .predict-btn {
            transition: all 0.2s ease;
        }
        
        .predict-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        #traffic-volume {
            transition: color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Add some utility functions for enhanced functionality
function formatTime(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
}

function getTrafficDescription(volume) {
    if (volume < 100) return 'Light traffic';
    if (volume < 200) return 'Moderate traffic';
    if (volume < 300) return 'Heavy traffic';
    return 'Very heavy traffic';
}

