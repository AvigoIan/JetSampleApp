import { h } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";

import { CButtonElement } from "oj-c/button";
import CoreRouter = require("ojs/ojcorerouter");
import KnockoutRouterAdapter = require("ojs/ojknockoutrouteradapter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");
import * as ko from "knockout";
import "ojs/ojknockout";
import "oj-c/button";
import "oj-c/tab-bar";
import { SelectionActionDetail, TabData } from "oj-c/tab-bar";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

const routes = [
  { path: "", redirect: "dashboard" }, // Default route redirects to 'dashboard'
  { path: "dashboard", detail: { label: "Dashboard" } },
  { path: "customers", detail: { label: "Customers" } },
];

const datas: TabData<string>[] = [
  {
    itemKey: "dashboard",
    label: "dashboard",
    icon: {
      type: "class",
      class: "oj-ux-ico-home",
    },
  },
  {
    itemKey: "customers",
    label: "customers",
    icon: {
      type: "class",
      class: "oj-ux-ico-education",
    },
  },
];

export function Content(props: any) {
  const handleSelectionAction = (event: {
    detail: SelectionActionDetail<string | number>;
  }) => {
    console.log("navigate to" + event.detail.value);
    // setSelectedTab(event.detail.value);
  };

  const [isRouterSynced, setIsRouterSynced] = useState(false);

  const tabDataArray = datas.map((tab) => ({
    itemKey: tab.itemKey,
    label: tab.label,
    icon: tab.icon,
  }));

  const dataProvider = new ArrayDataProvider<string, TabData<string>>(datas, {
    keyAttributes: "itemKey",
  });

  const router = useMemo(
    () => new CoreRouter(routes, { urlAdapter: new UrlParamAdapter() }),
    []
  );
  const selection = useMemo(() => new KnockoutRouterAdapter(router), [router]);

  useEffect(() => {
    router
      .sync()
      .then(() => {
        console.log("Router synchronized. Current path:", selection.path());
        console.log(
          "Initial state:",
          selection.state() ? selection.state() : "No state"
        );
        setIsRouterSynced(true); // Set state when router is synced
      })
      .catch((error) => {
        console.error("Router synchronization failed:", error);
      });
  }, []);

  useEffect(() => {
    const subscription = ko.computed(() => {
      console.log("Current path:", selection.path());
      console.log(
        "Current state:",
        selection.state() ? selection.state() : "No state"
      );
    });

    return () => subscription.dispose();
  }, [selection]);

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-width-1/4">
          <oj-c-button id="icon_button4" label="Label and start and end slot">
            <span slot="startIcon" class="oj-ux-ico-avatar"></span>
            <span slot="endIcon" class="oj-ux-ico-avatar"></span>
          </oj-c-button>
        </div>
      </div>
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
                  console.log("Tab selected:", event.detail.value);
                }}
              ></oj-c-tab-bar>
              <div class="oj-flex">
                <div class="oj-flex-item oj-sm-padding-4">
                  Path {selection.path()}
                </div>
                {selection.state && selection.state() && (
                  <div class="oj-flex-item oj-sm-padding-4">
                    Label {selection.state().detail.label}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
