import React from 'react';
import AuthRedirect from '../../components/AuthRedirect';
import './links.css';

const Links = () => {
  const [fadeIn, setFadeIn] = React.useState(false);
  const [links, setLinks] = React.useState([]);

  React.useEffect(() => {
    // Trigger fade-in after a short delay
    const timeOut = setTimeout(() => {
      setFadeIn(true);
    }, 100);

    // Declare a static array of link data
    const staticLinks = [
      {
        id: 1,
        title: 'Website Admin',
        url: 'https://backend.aeoucla.com/admin/'
      },
      {
        id: 2,
        title: 'AEO Photos Drive',
        url: 'https://drive.google.com/open?id=1se_LTRN9nzBj8toZ6YiASkNNCcL7yIvu&amp%3Busp=drive_copy&usp=drive_copy'
      },
      {
        id: 3,
        title: 'AEO Test Bank',
        url: 'https://drive.google.com/drive/folders/1qIT1uzQVssqa4q2tNuFBF9fHj6jyG75o?usp=drive_link'
      }
    ];

    // Update state with the static link data
    setLinks(staticLinks);

    // Clean up the timeout on unmount
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className={`homewrapper ${fadeIn ? 'fade-in-visible' : 'fade-in'}`}>
      <AuthRedirect />
      <div className="container">
        <div className="link-list-container">
          <h2>Links</h2>
          <div className="link-list">
            {links.map((link) => (
              <div key={link.id} className="link-item">
                {/* Clicking the title navigates to the link's URL in a new tab */}
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
