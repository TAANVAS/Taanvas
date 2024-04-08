document.addEventListener('DOMContentLoaded', function () {
  // Dropdown menu functionality
  const dropdownMenu = document.getElementById('dropdown-menu');
  const dropdownItems = document.getElementById('dropdown-menu-items');
  const selectedOption = document.getElementById('selected-option');

  // Open/close dropdown menu
  dropdownMenu.addEventListener('click', function () {
    dropdownItems.classList.toggle('hidden');
  });

  // Select option from dropdown menu
  dropdownItems.addEventListener('click', function (event) {
    const clickedOption = event.target.textContent;
    selectedOption.textContent = clickedOption;
    dropdownItems.classList.add('hidden');

    selectedOption.classList.remove('bg-green-500', 'bg-blue-500', 'bg-red-500', 'bg-yellow-500');
    selectedOption.classList.remove('text-white');

    switch (clickedOption) {
     case 'TA Applicant':
         selectedOption.classList.add('bg-green-500', 'text-white');
     break;
     case 'Department Staff':
         selectedOption.classList.add('bg-blue-500', 'text-white');
     break;
     case 'TA Committee Member':
         selectedOption.classList.add('bg-red-500', 'text-white');
     break;
     case 'Instructor':
         selectedOption.classList.add('bg-yellow-500', 'text-white');
     break;
     default:
         // handle default option
     break;

    }

  });



  // Submit button functionality
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function () {
    const selectedValue = selectedOption.textContent;

    switch (selectedValue) {
      case 'TA Applicant':
        window.location.href = 'login.html'+'?type='+encodeURIComponent("IsApplicant");
        break;
      case 'Department Staff':
        window.location.href = 'login.html'+'?type='+encodeURIComponent("IsStaff");
        break;
      case 'TA Committee Member':
        window.location.href = 'login.html'+'?type='+encodeURIComponent("IsCommittee");
        break;
      case 'Instructor':
        window.location.href = 'login.html'+'?type='+encodeURIComponent("IsInstructor");
        break;
      default:
        // handle default option
        break;
    }
  });
}); 