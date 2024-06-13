import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ userInfo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // 여기에 헤더를 제외하고 싶은 path를 넣으세요
  const excludedPaths = ["/", "/register", "/signup", "/set-nickname"];

  if (!excludedPaths.includes(location.pathname)) {
    return (
      <HeaderDiv>
        <h1>
          <Link to="/">
            <img src="./www/images/logo.png" alt="logo" />
          </Link>
        </h1>
        <ul className="menu">
          <li>
            <Link className="menu__item" to="/plantResisterList">
              식물등록
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="/reactCalendar">
              식물관리
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="/notice">
              커뮤니티
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            {userInfo ? (
              <div>
                {/* css 다듬어야함. */}
                <Link to={"/components"}>정보수정</Link>/
                <button
                  onClick={() => {
                    sessionStorage.removeItem("user");
                    navigate("/");
                  }}
                >
                  로그아웃
                </button>
              </div>
            ) : null}
          </li>
        </ul>
      </HeaderDiv>
    );
  } else {
    return <></>;
  }
};

export default Header;

const HeaderDiv = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--primary-100);
  h1 {
    width: 100px;
    img {
      width: 100%;
    }
  }
  ul {
    display: flex;
    align-items: center;
    gap: 30px;
    height: 100%;
    font-weight: 700;
    li {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  .menu__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;
