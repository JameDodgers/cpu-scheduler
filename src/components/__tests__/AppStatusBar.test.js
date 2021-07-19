import React from "react";

import AppStatusBar from "../AppStatusBar";

import { render } from "test-utils";

describe("<AppStatusBar />", () => {
  test("renders correctly", () => {
    const component = render(
      <AppStatusBar style="light" backgroundColor="#FFFFFF" />
    ).toJSON();

    expect(component).toMatchInlineSnapshot(`
      <View
        style={
          Array [
            Object {
              "height": 20,
            },
            "#FFFFFF",
          ]
        }
      />
    `);
  });
});
