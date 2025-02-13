import './tab.styles.scss'

export const Tab = () => {
    return (
      <table className="array">
      <thead>
        <tr>
          <th className='premiere'></th>
          <th className='paytone'>MonColleur</th>
          <th><strong>Un professeur particulier</strong></th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>Disponible <strong>24h/24</strong> et <strong>7j/7</strong></td>
            <td>&#x2705;</td>
            <td>&#x274C;</td>
          </tr>
          <tr>
            <td>Compétent sur <strong>tous les sujets</strong></td>
            <td>&#x2705;</td>
            <td>&#x274C;</td>
          </tr>
          <tr>
            <td>Te donne un <strong>compte-rendu détaillé</strong> de ta colle</td>
            <td>&#x2705;</td>
            <td>&#x274C;</td>
          </tr>
          <tr >
            <td>T'aide dans <strong>plusieurs matières</strong></td>
            <td>&#x2705;</td>
            <td>&#x274C;</td>
          </tr>
          <tr >
            <td>Te donne accès à des <strong>milliers</strong> de sujets d'annales</td>
            <td>&#x2705;</td>
            <td>&#x274C;</td>
          </tr>
          <tr >
            <td>Te permet de consulter des <strong>centaines</strong> de colles déjà corrigées</td>
            <td>&#x2705;</td>
            <td>&#x274C;</td>
          </tr>
          <tr >
            <td>Te donne <strong>instantanément</strong> un plan détaillé sur le sujet de ton choix</td>
            <td>&#x2705;</td>
            <td>&#x274C;</td>
          </tr>
          <tr >
            <td>Te coûte <strong>cher</strong></td>
            <td>&#x274C; </td>
            <td>&#x2705; </td>
          </tr>
          <tr >
            <td>Te fait stresser <strong>avant</strong> et <strong>pendant</strong> ta colle</td>
            <td>&#x274C;</td>
            <td>&#x2705;</td>
          </tr>
      </tbody>
    </table>
    )
  }