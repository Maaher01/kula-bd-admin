import React from "react";
import ReactDOM from "react-dom";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import Dashboard from "./Dashboard";
import Companysetup from "./page/Companysetup";
import Userlist from "./page/users/List";
import Imagelist from "./page/image/List";
import Addimage from "./page/image/Add";
import Editimage from "./page/image/Edit";
import CategoryList from "./page/category/List";
import AddCategory from "./page/category/Add";
import EditCategory from "./page/category/Edit";
import ProductList from "./page/product/List";
import AddProduct from "./page/product/Add";
import EditProduct from "./page/product/Edit";
import OrderList from "./page/order/List";
import EditOrder from "./page/order/Edit";
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
import Sociallinklist from "./page/sociallink/List";
import Addsociallink from "./page/sociallink/Add";
import Editsociallink from "./page/sociallink/Edit";
import GeneralQueryList from "./page/generalquery/List";
import EditGeneralQuery from "./page/generalquery/Edit";
import EditRole from "./page/role/Edit";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnauthorizedPage from "./page/403Page";
import Profile from "./page/profile/Profile";
import ProfileEdit from "./page/profile/Edit";
import EditUser from "./page/users/Edit";
import Discountlist from "./page/discount/List";
import Adddiscount from "./page/discount/Add";
import EditDiscount from "./page/discount/Edit";

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
            path={"/app/discounts"}
            element={
              <ProtectedRoute>
                <Discountlist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/discount/add"}
            element={
              <ProtectedRoute>
                <Adddiscount />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/discount/edit/:id"}
            element={
              <ProtectedRoute>
                <EditDiscount />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/image"}
            element={
              <ProtectedRoute permissionId={156}>
                <Imagelist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/image/add"}
            element={
              <ProtectedRoute permissionId={157}>
                <Addimage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/image/edit/:id"}
            element={
              <ProtectedRoute permissionId={158}>
                <Editimage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/category"}
            element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/category/add"}
            element={
              <ProtectedRoute>
                <AddCategory />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/category/edit/:id"}
            element={
              <ProtectedRoute>
                <EditCategory />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/product"}
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/product/add"}
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/product/edit/:id"}
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/order"}
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/app/order/edit/:id"}
            element={
              <ProtectedRoute>
                <EditOrder />
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
              <ProtectedRoute permissionId={155}>
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
