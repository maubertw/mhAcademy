import React from 'react';


const campusAvatar = (props) => (
    <div className="campus-box">
      <img src="/images/planet.jpg" className="campus-img-avatar" />
        <div className="campus-info">
          <div className="campus-titles">
              <p className="campus-name">{props.name}</p>
              <p>num students</p>
           </div>
            <div className="campus-modifyers">
              <p>edit</p>
              <button className="edit-button">delete</button>
            </div>
        </div>
    </div>
)


export default campusAvatar


