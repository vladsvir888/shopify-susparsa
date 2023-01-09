function showNotification(notificationMessage, type) {
  const notificationStack = document.querySelector('.notification-stack');
  const notificationEl = document.createElement('div');

  notificationEl.classList.add('notification');

  if (type === 'success') {
    notificationEl.classList.add('notification--success');
  } else {
    notificationEl.classList.add('notification--error');
  }

  notificationEl.setAttribute('role', 'alert');
  notificationEl.innerHTML = notificationMessage;

  notificationStack.append(notificationEl);

  setTimeout(() => {
    notificationEl.remove();
  }, 3500);
}

export default showNotification;
