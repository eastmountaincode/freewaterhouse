document.addEventListener('DOMContentLoaded', function () {
    const people = ['Aayush', 'Andrew', 'Jack', 'John'];

    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const daysSinceStartOfYear = Math.floor((today - startOfYear) / (24 * 60 * 60 * 1000));

    // Adjust for the week to start on Monday
    const dayOfWeek = (today.getDay() + 6) % 7; // Monday becomes 0, Sunday becomes 6
    const adjustedDays = daysSinceStartOfYear - dayOfWeek;

    const weekNumber = Math.ceil((adjustedDays + 1) / 7);
    const personIndex = (weekNumber + 2) % people.length; // Assuming 4 people in the rotation
    const trashPerson = people[personIndex];

    // Calculate indices for the previous and next person
    const prevPersonIndex = (personIndex + 3) % people.length; // Subtract 1 and wrap around using modulo 4
    const nextPersonIndex = (personIndex + 1) % people.length; // Add 1 and wrap around using modulo 4

    // Calculate start (Monday) and end (Sunday) of the current week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Format dates
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedStart = startOfWeek.toLocaleDateString('en-US', options);
    const formattedEnd = endOfWeek.toLocaleDateString('en-US', options);

    document.getElementById('to_and_from').textContent = `Trash duty for this week (${formattedStart} to ${formattedEnd}):`;
    document.getElementById('prev_person').textContent = `${people[prevPersonIndex]}`;
    document.getElementById('person').textContent = trashPerson;
    document.getElementById('next_person').textContent = `${people[nextPersonIndex]}`;
    document.getElementById('week_number').textContent = `It is week number: ${weekNumber}`;
});
