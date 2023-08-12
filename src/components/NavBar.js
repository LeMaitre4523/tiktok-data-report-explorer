

function NavBar () {
    return (
        <div>
      <header className="header" id="header">
        <div className="header_toggle">
          <i className="bx bx-menu" id="header-toggle"></i>
        </div>
        <div className="lang-select" style={{width: "200px" }}>
          <select id="select-21dv5">
            <option value="0">Français</option>
            <option value="1">Anglais</option>
          </select>
        </div>
        <div className="header_img">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt=""
          />
        </div>
      </header>
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <a href="https://github.com/LeMaitre4523/tiktok-data-report-explorer" target="_blank" className="nav_logo"><i className="bx bxl-tiktok"></i><span className="nav_logo-name">TDRE</span></a>
            <div className="nav_list">
              <a href="/profil" className="nav_link active"><i className="bx bxs-user-detail"></i><span className="nav_name" id="navprofil">Profil</span></a>
              <a href="/activity" className="nav_link"><i className="bx bx-user nav_icon"></i><span className="nav_name" id="navactivity">Activités</span></a>
              <a href="/comments" className="nav_link"><i className="bx bx-message-square-detail nav_icon"></i><span className="nav_name" id="navcomments">Commentaires</span></a>
              <a href="/posts" className="nav_link"><i className="bx bx-chat"></i><span className="nav_name" id="navmessages">Messages</span></a>
              <a href="/videos" className="nav_link"><i className="bx bxs-videos"></i><span className="nav_name" id="navvideos">Vidéos</span></a>
              <a href="/settings" className="nav_link"><i className="bx bx-bar-chart-alt-2 nav_icon"></i><span className="nav_name" id="navsettings">Paramètres</span></a>
              <a href="/ads" className="nav_link"><i className="bx bx-stats"></i><span className="nav_name" id="navads">Ads et données</span></a>
              <a href="/about" className="nav_link"><i className="bx bx-info-circle"></i><span className="nav_name" id="navabout">A propos de TDRE</span></a>
            </div>
          </div>
          <a href="https://github.com/LeMaitre4523/tiktok-data-report-explorer" target="_blank" className="nav_link"><span className="nav_name">By LeMaitre4523</span></a>
        </nav>
      </div>
    </div>
    );
}


export default NavBar;