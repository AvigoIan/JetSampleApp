import { h } from "preact";
import { useMemo } from "preact/hooks";

import { CButtonElement } from "oj-c/button";

//For the transpiled javascript to load the element's module, import as below
import "oj-c/button";

export function Content(props: any) {
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
    </div>
  );
}
