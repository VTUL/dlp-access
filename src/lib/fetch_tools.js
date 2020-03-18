export const fetchCopyHTML = async (htmlLink, component) => {
  let response = null;
  let data = null;

  try {
    response = await fetch(htmlLink);
    data = await response.text();
  } catch (error) {
    console.error(
      `Error fetching html for ${component.constructor.name} component`
    );
    console.error(error);
  }
  if (data !== null) {
    component.setState({ copy: data });
  }
};
