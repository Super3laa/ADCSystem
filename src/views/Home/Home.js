import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Card from "./Card";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Home(props) {
  const history = useHistory();
  const [CardChildren, setCardChildren] = useState(false);
  const lang = useSelector((state) => state.language);
  const permissions = useSelector((state) => state.user.permissions);
  const userType = useSelector((state)=> state.user.type);
  useEffect(() => {
    if (props.location.pathname == "/coursesDetails") {
      let arr = []; 
      console.log(userType )

      Object.keys(routes["courses"].children).map((child, i) => {
        console.log(userType )
        routes["courses"].children[child].type == userType && arr.push(
          <Col xs={12} md={3}>
            <Card key={i} data={routes["courses"].children[child]} />
          </Col>
        );
      });
      setCardChildren(arr);
    }
  }, [userType]);
  const handleNavigation = (path) => {
    history.push(path);
  };
  const routes = {
    students: {
      title: "الطلاب",
      icon: "FaUserAlt",
      permissions: ["admin", "superadmin"],
      type:"all",
      onClick: (e) => {
        e.preventDefault();
        handleNavigation("/students");
      },
      children: false,
    },
    courses: {
      title: "البرامج",
      type:"all",
      onClick: (e) => {
        e.preventDefault();
        handleNavigation("/coursesDetails");
      },
      icon: "FaBook",
      permissions: ["admin", "superadmin"],
      children: {
        General: {
          title: "عام",
          type:"عام",
          icon: "FaBook",
          onClick: (e) => {
            e.preventDefault();
            handleNavigation("/courses/عام");
          },
        },
        Communications: {
          title: "اتصالات",
          type:"عام",
          icon: "FaBook",
          onClick: (e) => {
            e.preventDefault();
            handleNavigation("/courses/اتصالات");
          },
        },
        Mechatronics: {
          title: "ميكاترونكس",
          icon: "FaBook",
          type:"عام",
          onClick: (e) => {
            e.preventDefault();
            handleNavigation("/courses/ميكاترونكس");
          },
        },
        Computer: {
          title: "حواسب",
          icon: "FaBook",
          type:"عام",
          onClick: (e) => {
            e.preventDefault();
            handleNavigation("/courses/حواسب");
          },
        },
        MilitaryScience: {
          title: "علوم عسكرية",
          icon: "FaBook",
          type:"علوم عسكرية",
          onClick: (e) => {
            e.preventDefault();
            handleNavigation("/courses/علوم عسكرية");
          },
        },
        AirDefense: {
          title: "دفاع جوي",
          icon: "FaBook",
          type:"دفاع جوي",
          onClick: (e) => {
            e.preventDefault();
            handleNavigation("/courses/دفاع جوي");
          },
        },
        Specialization: {
          title: "تخصصات",
          icon: "FaBook",
          type:"تخصصات",
          onClick: (e) => {
            e.preventDefault();
            handleNavigation("/courses/تخصصات");
          },
        },
      },
    },
    doctors: {
      title: "الأساتذه",
      icon: "FaUser",
      permissions: ["admin", "superadmin"],
      type:"all",
      children: false,
      onClick: (e) => {
        e.preventDefault();
        handleNavigation("/doctors");
      },
    },
    officers: {
      title: "الضباط",
      icon: "FaUser",
      type:"all",
      permissions: ["admin", "superadmin"],
      children: false,
      onClick: (e) => {
        e.preventDefault();
        handleNavigation("/officers");
      },
    },
    tassistants: {
      title: "المعيدين",
      icon: "FaUser",
      permissions: ["admin", "superadmin"],
      type:"all",

      children: false,
      onClick: (e) => {
        e.preventDefault();
        handleNavigation("/tassistants");
      },
    },attendance: {
      title: "حضور الأساتذه",
      icon: "FaUser",
      permissions: ["superadmin","admin"],
      children: false,
      type:"all",
      onClick: (e) => {
        e.preventDefault();
        handleNavigation("/doctorsAttendance");
      },
    },
    users: {
      title: "المستخدمين",
      icon: "FaUser",
      permissions: ["superadmin"],
      children: false,
      type:"all",
      onClick: (e) => {
        e.preventDefault();
        handleNavigation("/users");
      },
    },
  };
  let currentRoutes = props.match.params.hasOwnProperty("section")
    ? routes[props.match.params.section].children
    : routes;

  return (
    <Layout>
      <Container dir={lang.direction}>
        <Row>
          {CardChildren
            ? CardChildren
            : Object.keys(currentRoutes).map((data, i) => {
              return (
                (currentRoutes[data].permissions.includes(permissions)) && (
                  <Col xs={12} md={3}>
                    <Card key={i} data={currentRoutes[data]} />
                  </Col>
                )
              );
            })}
        </Row>
      </Container>
    </Layout>
  );
}
