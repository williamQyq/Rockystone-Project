import React from 'react';

import UploadCSV from './Upload_csv.js'
import PcConfiguration from './PcConfiguration.js'
import './scss/styles.scss'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      content_key: '1'
    };

    this.handleContentKey = this.handleContentKey.bind(this);
    this.getContentKey = this.getContentKey.bind(this);
  }

  handleContentKey(content_key) {
    this.setState({content_key});
  }
  getContentKey() {
    const content_key = this.state.content_key;
    return content_key;
  }
   
  render(){

    return (
      <Layout>
        <TopHeader/>
        <Layout>
          <LeftSider onContentKeyChange={this.handleContentKey}/>
          <Layout style={{ padding: '0 24px 24px'}}>
            <MainContent getContentKey={this.getContentKey}/>
          </Layout>
        </Layout>
      </Layout>
      

    );
  }
}

class TopHeader extends React.Component {
  render() {
    return(
      <Header className="header">
          <div className="logo"/>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className="top-header">
            <Menu.Item key="1">Rocky</Menu.Item>
            <Menu.Item key="2">ProE</Menu.Item>
            <Menu.Item key="3">Beau</Menu.Item>
          </Menu>
        </Header>
    );
  }
}

class LeftSider extends React.Component{
    constructor(props) {
      super(props);
      this.handleContentKey = this.handleContentKey.bind(this);
    }
    handleContentKey(key) {
      console.log("Menu "+key+" is Clicked");
      this.props.onContentKeyChange(key);
    }

    render(){
    return(
      <Sider width={200} className="site-layout-background">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={(e) => this.handleContentKey(e.key)}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                  <Menu.Item key="1">Order Report</Menu.Item>
                  <Menu.Item key="2">PC Configuration</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
    );
    }
}

class MainContent extends React.Component {
  
  contentSwitch = () => {
    const key = this.props.getContentKey();
      switch(key) {
        case '1':
          return <UploadCSV/>;
        case '2':
          return <PcConfiguration/>;
        default:
          break;
      }
  }
  
  render() {
    
    return(
      <div style={{height:'100%'}}>
      <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: '100%'
          }}
        >
          {this.contentSwitch()}
        </Content>
        </div>
    );
  }
}


export default App;
