// parking.js

// Example parking slots
const parkingSlots = [
  { id: 1, occupied: false },
  { id: 2, occupied: false },
  { id: 3, occupied: false },
  { id: 4, occupied: false },
];

function parkCar(slotId) {
  const slot = parkingSlots.find((s) => s.id === slotId);
  if (!slot) return;

  if (!slot.occupied) {
    slot.occupied = true;
    alert("Car parked in slot " + slotId);
  } else {
    alert("Slot " + slotId + " is already occupied");
  }
}

function freeSlot(slotId) {
  const slot = parkingSlots.find((s) => s.id === slotId);
  if (slot) {
    slot.occupied = false;
    alert("Slot " + slotId + " is now free");
  }
}

// Example calls (you can hook these to UI buttons)
console.log("Parking system initialized", parkingSlots);
