describe("works app", function () {
  beforeEach(function () {
    cy.viewport(1920, 1000);
    cy.visit("http://localhost:3000");
  });

  it("should open", () => {
    cy.get(`[class^=search_input_search`).focus().type("gutma").blur();
    cy.get(`[class^=button_btn`).click();
    cy.request(
      "GET",
      "/api.github.com/search/users?q=gutma&sort=repositories&order=${sort}&per_page=100"
    ).then((res) => expect(res.status).to.eq(200));
    cy.get(`[class^=result-render_list`).should("be.visible");
    cy.get(`[class^=result-render_link`).first().click();
    cy.get(`[class^=result-render_link`).first().should('have.attr', 'href').then((href)=> {
      const path = href
      cy.url().should("include", `${path}`)
    });
    cy.get(`[class^=user-details_img`).should("be.visible");
    cy.get(`[class^=user-details_subtitle`).should("be.visible");
    cy.get(`[id^=name_user`).first().invoke('text').then(text => {
      const nameUser = text;
      cy.get(`[class^=user-details_title`).should("be.visible", nameUser);
      cy.request("GET", `/api.github.com/users/${nameUser}/repos`).then((res) => expect(res.status).to.eq(200))
    });
    cy.get(`[class^=user-details_list_repos`).should("be.visible");
    cy.get(`[class^=modal_btn_close`).click();
    cy.get(`[class^=modal_wrapper`).should("not.exist");
  });
});

