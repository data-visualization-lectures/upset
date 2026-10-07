test("upset resolves as a viz saved-project tool", () => {
  const entry = getAppRegistryEntry("upset");
  assert.equal(resolveRequiredScopeFromApp("upset"), "viz");
  assert.equal(resolveProjectBackendFromApp("upset"), "projects");
  assert.equal(entry?.toolUrl, "https://upset.dataviz.jp");
  assert.equal(entry?.marketingUrl, "https://www.dataviz.jp/upset/");
  assert.equal(entry?.hubHost, "app.dataviz.jp");
  assert.equal(entry?.supportsSavedProjects, true);
});

