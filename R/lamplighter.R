#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
lamplighter <- function(nx = 20, ny = 20, t = 50, width = NULL, height = NULL) {
  x = list(nx = nx, ny = ny, t = t)
  # create widget
  htmlwidgets::createWidget(
    name = 'lamplighter',
    x,
    width = width,
    height = height,
    package = 'probArt'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
lamplighterOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'lamplighter', width, height, package = 'probArt')
}

#' Widget render function for use in Shiny
#'
#' @export
renderLamplighter <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, lamplighterOutput, env, quoted = TRUE)
}
