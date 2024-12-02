import { h } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import CoreRouter = require("ojs/ojcorerouter");
import KnockoutRouterAdapter = require("ojs/ojknockoutrouteradapter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");
import * as ko from "knockout";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { TabData } from "oj-c/tab-bar";
import "oj-c/button";
import "oj-c/tab-bar";
import { Dashboard } from "../dashboard/index";
import { Customers } from "../customers/index";

export function Content() {
  const [isRouterSynced, setIsRouterSynced] = useState(false);

  const routes = [
    { path: "", redirect: "dashboard" },
    {
      path: "dashboard",
      detail: {
        label: "Dashboard",
        itemKey: "dashboard",
        icon: { type: "class", class: "oj-ux-ico-home" },
      },
    },
    {
      path: "customers",
      detail: {
        label: "Customers",
        itemKey: "customers",
        icon: { type: "class", class: "oj-ux-ico-education" },
      },
    },
  ];

  const tabDetails = routes.slice(1).map((route) => route.detail);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<string, TabData<string>>(tabDetails, {
        keyAttributes: "itemKey",
      }),
    []
  );

  const router = useMemo(
    () => new CoreRouter(routes, { urlAdapter: new UrlParamAdapter() }),
    []
  );

  const selection = new KnockoutRouterAdapter(router);

  useEffect(() => {
    router
      .sync()
      .then(() => {
        console.log("Router synchronized. Current path:", selection.path());
        setIsRouterSynced(true);
      })
      .catch((error) => {
        console.error("Router synchronization failed:", error);
        setIsRouterSynced(false);
      });
  }, [router, selection]);

  const getPageElement = (page: string) => {
    console.log("page is ", page);
    switch (page) {
      case "dashboard":
        return <Dashboard />;
      case "customers":
        return <Customers />;
      default:
        return <Dashboard />;
    }
  };

  console.log("selection is ", selection.state());
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex">
        <div class="oj-flex-item">
          {isRouterSynced && (
            <>
              <oj-c-tab-bar
                data={dataProvider}
                selection={selection.path}
                edge="top"
                layout="stretch"
                display="standard"
                aria-label="TabBar for demo"
                onojSelectionAction={(event) => {
                  const newTab = event.detail.value as string;
                  console.log("Tab selected:", newTab);
                  router.go({ path: newTab });
                }}
              ></oj-c-tab-bar>
              {/* NOT getting triggered the getPageElement */}
              {selection.state() &&
                getPageElement(selection.state().detail.itemKey)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
