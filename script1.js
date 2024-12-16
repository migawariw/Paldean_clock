function calculatePaldeaTime() {
  const now = new Date(); // Get the current time
  const totalSeconds = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds(); // Total seconds

  const paldeaSeconds = (totalSeconds % (72*60)) * 20; // Convert to Paldea time in seconds

  const paldeaHours = Math.floor(paldeaSeconds / 3600); // Hours are now calculated from seconds
  const paldeaDisplayMinutes = Math.floor((paldeaSeconds % 3600) / 60); // Minutes
  const paldeaDisplaySeconds = Math.floor(paldeaSeconds % 60); // Seconds

  return {
    hours: paldeaHours,
    minutes: paldeaDisplayMinutes,
    seconds: paldeaDisplaySeconds
  };
}

// Function to calculate other region times
function calculateRegionTime(baseTime, offset) {
  let hours = baseTime.hours + offset;
  if (hours < 0) hours += 24;
  if (hours >= 24) hours -= 24;
  return {
    hours,
    minutes: baseTime.minutes,
    seconds: baseTime.seconds
  };
}

// Function to update all clocks
function updateClock() {
  const now = new Date();
  const paldeaTime = calculatePaldeaTime();

  // Current real-world time
  const currentTimeElement = document.getElementById("current-time");
  const formattedCurrentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  currentTimeElement.textContent = `Current Time: ${formattedCurrentTime}`;

  // Paldea Region Time
  const paldeaTimeElement = document.getElementById("paldea-time");
  const formattedPaldeaTime = `${String(paldeaTime.hours).padStart(2, '0')}:${String(paldeaTime.minutes).padStart(2, '0')}:${String(paldeaTime.seconds).padStart(2, '0')}`;
  paldeaTimeElement.textContent = `Paldea Time: ${formattedPaldeaTime}`;

  // Kitakami Region Time (Paldea + 6 hours)
  const kitakamiTime = calculateRegionTime(paldeaTime, 6);
  const kitakamiTimeElement = document.getElementById("kitakami-time");
  const formattedKitakamiTime = `${String(kitakamiTime.hours).padStart(2, '0')}:${String(kitakamiTime.minutes).padStart(2, '0')}:${String(kitakamiTime.seconds).padStart(2, '0')}`;
  kitakamiTimeElement.textContent = `Kitakami Time: ${formattedKitakamiTime}`;

  // Blueberry Academy Time (Paldea - 6 hours)
  const blueberryTime = calculateRegionTime(paldeaTime, -6);
  const blueberryTimeElement = document.getElementById("blueberry-time");
  const formattedBlueberryTime = `${String(blueberryTime.hours).padStart(2, '0')}:${String(blueberryTime.minutes).padStart(2, '0')}:${String(blueberryTime.seconds).padStart(2, '0')}`;
  blueberryTimeElement.textContent = `Blueberry Academy Time: ${formattedBlueberryTime}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to set the clock immediately
updateClock();
