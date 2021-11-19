it('should render right amount of processes', () => {
  let numberProcesses = 3
  
  cy.visit('/')
  cy.get('input').type(numberProcesses)

  const processes = Array.from({length: numberProcesses}, (_, i) => `Processo ${i + 1}`)

  processes.forEach(function (value) {
      cy.get('div')
        .should('contain', value)
  })
})

it('should go to next screen', () => {
  cy.visit('/')

  cy.get('input').type(2)

  cy.get('div').contains('Processo 1').parent().find('input').eq(0).type('2')
  cy.get('div').contains('Processo 1').parent().find('input').eq(1).type('1')
  cy.get('div').contains('Processo 2').parent().find('input').eq(0).type('4')
  cy.get('div').contains('Processo 2').parent().find('input').eq(1).type('3')
  
  cy.get('div').contains('Próximo').parent().click()

  cy.get('div').contains('Algoritmo de Escalonamento').should('be.visible')
})