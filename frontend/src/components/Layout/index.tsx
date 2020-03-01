import React, {
  memo,
  useCallback,
  useMemo,
  useState,
  ReactNode,
  useEffect
} from "react";
import { Button, Layout as AntLayout, Menu, Drawer } from "antd";

import {
  AppstoreAddOutlined,
  MenuUnfoldOutlined,
  HomeOutlined
} from "@ant-design/icons";

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "react-accessories";

import Login from "./Login";
import Register from "./Register";

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

type PageState = "children" | "login" | "register";

const MyContent = styled(Content)`
  padding: 0 50px;
`;

const MyHeader = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

const MyIcon = styled(MenuUnfoldOutlined)`
  color: white;
  font-weight: 700;
  font-size: 25px;
  margin-right: 8px;
`;

const MyLayout = styled(AntLayout)`
  height: 100vh;
`;

const LogoutBtn = styled(Button)`
  margin-left: auto;
`;

const MyMenu = styled(Menu)`
  margin-top: 32px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 24px;
`;

function Layout({ children }: LayoutProps) {
  const history = useHistory();
  const { isLogined, handleTokenChange } = useAuthContext();

  const [collapsed, setCollapsed] = useState(true);
  const [pageState, setPageState] = useState<PageState>(
    isLogined ? "children" : "login"
  );
  useEffect(() => {
    setPageState(isLogined ? "children" : "login");
  }, [isLogined]);

  const toggleCollapse = useCallback(() => setCollapsed(o => !o), []);

  const selectedKey = `/${history.location.pathname.split("/")[1]}`;

  const renderedTitle = useMemo(
    () => (
      <MyHeader>
        {isLogined && <MyIcon onClick={toggleCollapse} />}
        <Title>Crested Myna</Title>
        {isLogined && (
          <LogoutBtn onClick={() => handleTokenChange("")} type="link">
            Logout
          </LogoutBtn>
        )}
      </MyHeader>
    ),
    [handleTokenChange, isLogined, toggleCollapse]
  );

  const renderedContent = useMemo(() => {
    if (pageState === "children") return children;
    if (pageState === "login")
      return (
        <Login
          handleRegister={() => setPageState("register")}
          handleTokenChange={handleTokenChange}
        />
      );

    if (pageState === "register")
      return (
        <Register
          handleLogin={() => setPageState("login")}
          handleTokenChange={handleTokenChange}
        />
      );
  }, [children, handleTokenChange, pageState]);

  return (
    <MyLayout>
      <Drawer
        placement="left"
        push
        visible={!collapsed}
        onClose={toggleCollapse}
      >
        <MyMenu mode="inline" defaultSelectedKeys={[selectedKey]}>
          <Menu.Item key="/" onClick={() => history.push("/")}>
            <HomeOutlined />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="/game" onClick={() => history.push("/game")}>
            <AppstoreAddOutlined />
            <span>Game</span>
          </Menu.Item>
        </MyMenu>
      </Drawer>
      <Header>{renderedTitle}</Header>
      <MyContent>{renderedContent}</MyContent>
    </MyLayout>
  );
}

export default memo(Layout);
