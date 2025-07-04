import application from "@reuc/application/applications/index.js";

/** TODO: if outsider session expires, then save the form data and the
 * URL action that tried to achieve, in order to use after confirm login.
 * Give much thought about it like how to manage if the user dont try to
 * login after receive error for a while.
 */
export async function createProjectHandler(req, res) {
  try {
    const outsider = req.user;

    const response = await application.create({
      uuidAuthor: outsider.uuid_user,
      body: req.body,
    });

    return res.status(201).json({
      success: true,
      data: {
        application: response.application,
      },
    });
  } catch (err) {
    return res.status(400).json({ success: false, err: err.message });
  }
}
