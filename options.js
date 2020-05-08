// Saves options to chrome.storage
function save_options() {
    var category = document.getElementById('category').value;
    var name = document.getElementById('itemName').value;
    chrome.storage.sync.set({
      selectedCategory: category,
      itemName: name
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get({
      selectedCategory: 'jackets',
      itemName: ''
    }, function(items) {
      document.getElementById('category').value = items.selectedCategory;
      document.getElementById('itemName').value = items.itemName;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);