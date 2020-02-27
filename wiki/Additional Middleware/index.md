There are smaller pieces of middleware that can come in handy.

<typedef name="CsrfCheckOptions">types/options/index.xml</typedef>

This is useful to assert on the existence of session, and that its `csrf` property matches the `csrf` parameter either from parsed request body, or query.

%EXAMPLE: test/spec/middleware/csrf-check%

%~%