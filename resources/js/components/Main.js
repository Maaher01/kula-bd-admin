import React from "react";
import ReactDOM from "react-dom";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import Dashboard from "./Dashboard";
import Companysetup from "./page/Companysetup";
import Userlist from "./page/users/List";
import Countrylist from "./page/country/List";
import Addcountry from "./page/country/Add";
import Editcountry from "./page/country/Edit";
import Universitylist from "./page/university/List";
import Adduniversity from "./page/university/Add";
import Edituniversity from "./page/university/Edit";
import Degreelist from "./page/degree/List";
import Adddegree from "./page/degree/Add";
import Editdegree from "./page/degree/Edit";
import Courselist from "./page/course/List";
import Addcourse from "./page/course/Add";
import Editcourse from "./page/course/Edit";
import Clientlist from "./page/client/List";
import Addclient from "./page/client/Add";
import Editclient from "./page/client/Edit";
import Contactlist from "./page/contact/List";
import Addcontact from "./page/contact/Add";
import Editcontact from "./page/contact/Edit";
import Imagelist from "./page/image/List";
import Addimage from "./page/image/Add";
import Editimage from "./page/image/Edit";
import Herolist from "./page/herosection/List";
import AddHero from "./page/herosection/Add";
import EditHero from "./page/herosection/Edit";
import Menulist from "./page/menu/List";
import Addmenu from "./page/menu/Add";
import Editmenu from "./page/menu/Edit";
import Sectionlist from "./page/section/List";
import Addsection from "./page/section/Add";
import Editsection from "./page/section/Edit";
import ComponentList from "./page/component/List";
import Addcomponent from "./page/component/Add";
import Editcomponent from "./page/component/Edit";
import Reviewlist from "./page/review/List";
import Addreview from "./page/review/Add";
import Editreview from "./page/review/Edit";
import Faqlist from "./page/faq/List";
import Addfaq from "./page/faq/Add";
import Editfaq from "./page/faq/Edit";
import Newsfeedlist from "./page/newsfeed/List";
import Addnewsfeed from "./page/newsfeed/Add";
import Editnewsfeed from "./page/newsfeed/Edit";
import Sociallinklist from "./page/sociallink/List";
import Addsociallink from "./page/sociallink/Add";
import Editsociallink from "./page/sociallink/Edit";
import Eventlist from "./page/events/List";
import Addevent from "./page/events/Add";
import Editevent from "./page/events/Edit";
import Studentregistrationlist from "./page/studentregistration/List";
import Addstudentregistration from "./page/studentregistration/Add";
import Editstudentregistration from "./page/studentregistration/Edit";
import RecentVisaSuccessList from "./page/recentvisasuccess/List";
import AddRecentVisaSuccess from "./page/recentvisasuccess/Add";
import CounterList from "./page/counter/List";
import AddCounter from "./page/counter/Add";
import EditCounter from "./page/counter/Edit";
import GeneralQueryList from "./page/generalquery/List";
import EditGeneralQuery from "./page/generalquery/Edit";
import EditRole from "./page/role/Edit";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnauthorizedPage from "./page/403Page";
import Profile from "./page/profile/Profile";
import ProfileEdit from "./page/profile/Edit";
import EditUser from "./page/users/Edit";

function Main() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path={"/"} element={<Login />}></Route>
          <Route
            path={"/app/logout"}
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/dashboard"}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/users"}
            element={
              <ProtectedRoute permissionId={152}>
                <Userlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/users/edit/:id"}
            element={
              <ProtectedRoute permissionId={153}>
                <EditUser />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/dashboard/companysetup"}
            element={
              <ProtectedRoute permissionId={103}>
                <Companysetup />
              </ProtectedRoute>
            }
          ></Route>
          <Route path={"/app/registration"} element={<Registration />}></Route>
          <Route
            path={"/app/country"}
            element={
              <ProtectedRoute>
                <Countrylist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/profile"}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/profile/edit/:id"}
            element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/country/add"}
            element={
              <ProtectedRoute>
                <Addcountry />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/country/edit/:id"}
            element={
              <ProtectedRoute>
                <Editcountry />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/university"}
            element={
              <ProtectedRoute>
                <Universitylist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/university/add"}
            element={
              <ProtectedRoute>
                <Adduniversity />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/university/edit/:id"}
            element={
              <ProtectedRoute>
                <Edituniversity />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/degree"}
            element={
              <ProtectedRoute>
                <Degreelist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/degree/add"}
            element={
              <ProtectedRoute>
                <Adddegree />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/degree/edit/:id"}
            element={
              <ProtectedRoute>
                <Editdegree />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/course"}
            element={
              <ProtectedRoute>
                <Courselist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/course/add"}
            element={
              <ProtectedRoute>
                <Addcourse />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/course/edit/:id"}
            element={
              <ProtectedRoute>
                <Editcourse />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/client"}
            element={
              <ProtectedRoute permissionId={105}>
                <Clientlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/client/add"}
            element={
              <ProtectedRoute permissionId={106}>
                <Addclient />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/client/edit/:id"}
            element={
              <ProtectedRoute permissionId={107}>
                <Editclient />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/contact"}
            element={
              <ProtectedRoute permissionId={109}>
                <Contactlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/contact/add"}
            element={
              <ProtectedRoute permissionId={110}>
                <Addcontact />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/contact/edit/:id"}
            element={
              <ProtectedRoute permissionId={111}>
                <Editcontact />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/image"}
            element={
              <ProtectedRoute>
                <Imagelist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/image/add"}
            element={
              <ProtectedRoute>
                <Addimage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/image/edit/:id"}
            element={
              <ProtectedRoute>
                <Editimage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/hero-section"}
            element={
              <ProtectedRoute permissionId={113}>
                <Herolist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/hero-section/add"}
            element={
              <ProtectedRoute permissionId={114}>
                <AddHero />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/hero-section/edit/:id"}
            element={
              <ProtectedRoute permissionId={115}>
                <EditHero />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/menu"}
            element={
              <ProtectedRoute permissionId={117}>
                <Menulist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/menu/add"}
            element={
              <ProtectedRoute permissionId={118}>
                <Addmenu />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/menu/edit/:id"}
            element={
              <ProtectedRoute permissionId={119}>
                <Editmenu />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/section"}
            element={
              <ProtectedRoute permissionId={121}>
                <Sectionlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/section/add"}
            element={
              <ProtectedRoute permissionId={122}>
                <Addsection />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/section/edit/:id"}
            element={
              <ProtectedRoute permissionId={123}>
                <Editsection />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/component"}
            element={
              <ProtectedRoute permissionId={125}>
                <ComponentList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/component/add"}
            element={
              <ProtectedRoute permissionId={126}>
                <Addcomponent />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/component/edit/:id"}
            element={
              <ProtectedRoute permissionId={127}>
                <Editcomponent />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/review"}
            element={
              <ProtectedRoute permissionId={129}>
                <Reviewlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/review/add"}
            element={
              <ProtectedRoute permissionId={130}>
                <Addreview />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/review/edit/:id"}
            element={
              <ProtectedRoute permissionId={131}>
                <Editreview />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/faq"}
            element={
              <ProtectedRoute permissionId={133}>
                <Faqlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/faq/add"}
            element={
              <ProtectedRoute permissionId={134}>
                <Addfaq />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/faq/edit/:id"}
            element={
              <ProtectedRoute permissionId={135}>
                <Editfaq />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/newsfeed"}
            element={
              <ProtectedRoute permissionId={137}>
                <Newsfeedlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/newsfeed/add"}
            element={
              <ProtectedRoute permissionId={138}>
                <Addnewsfeed />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/newsfeed/edit/:id"}
            element={
              <ProtectedRoute permissionId={139}>
                <Editnewsfeed />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/sociallink"}
            element={
              <ProtectedRoute permissionId={145}>
                <Sociallinklist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/sociallink/add"}
            element={
              <ProtectedRoute permissionId={146}>
                <Addsociallink />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/sociallink/edit/:id"}
            element={
              <ProtectedRoute permissionId={147}>
                <Editsociallink />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/event"}
            element={
              <ProtectedRoute>
                <Eventlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/event/add"}
            element={
              <ProtectedRoute>
                <Addevent />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/event/edit/:id"}
            element={
              <ProtectedRoute>
                <Editevent />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/studentregistration"}
            element={
              <ProtectedRoute>
                <Studentregistrationlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/studentregistration/add"}
            element={
              <ProtectedRoute>
                <Addstudentregistration />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/studentregistration/edit/:id"}
            element={
              <ProtectedRoute>
                <Editstudentregistration />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/recentvisasuccess"}
            element={
              <ProtectedRoute>
                <RecentVisaSuccessList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/recentvisasuccess/add"}
            element={
              <ProtectedRoute>
                <AddRecentVisaSuccess />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/counter"}
            element={
              <ProtectedRoute permissionId={141}>
                <CounterList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/counter/add"}
            element={
              <ProtectedRoute permissionId={142}>
                <AddCounter />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/counter/edit/:id"}
            element={
              <ProtectedRoute permissionId={143}>
                <EditCounter />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/generalquery"}
            element={
              <ProtectedRoute permissionId={155}>
                <GeneralQueryList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/generalquery/edit/:id"}
            element={
              <ProtectedRoute permissionId={156}>
                <EditGeneralQuery />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/role"}
            element={
              <ProtectedRoute permissionId={151}>
                <EditRole />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/unauthorized"}
            element={
              <ProtectedRoute>
                <UnauthorizedPage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default Main;

if (document.getElementById("app")) {
  ReactDOM.render(<Main />, document.getElementById("app"));
}
