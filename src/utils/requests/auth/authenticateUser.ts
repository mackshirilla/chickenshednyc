// Authenticate User
export function authenticate(): Promise<void> {
  const authToken = localStorage.getItem('authToken');

  //if no authToken, redirect to login page
  if (!authToken) {
    window.location.href = '/login';
    return Promise.reject();
  }

  return fetch('https://xszy-vp96-kdkh.n7c.xano.io/api:WyQO-hFi/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      // if .page-wrapper has the attribute gated
      const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;
      const isGated = pageWrapper && pageWrapper.hasAttribute('gatedContent');

      if (isGated) {
        // redirect to login page
        window.location.href = '/login';
        localStorage.removeItem('authToken');
        localStorage.removeItem('profile');
        localStorage.removeItem('role');
      }
    });
}
