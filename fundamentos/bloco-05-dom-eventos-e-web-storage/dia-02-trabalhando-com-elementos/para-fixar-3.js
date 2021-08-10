let pai = document.getElementById('pai');

    for (let i = pai.childNodes.length - 1; i >= 0; i -= 1) {
      let currentChildren = pai.childNodes[i];
      if (currentChildren.id !== 'elementoOndeVoceEsta') {
        currentChildren.remove();
      }
    }

    let segundoEUltimoFilhoDoFilho = document.getElementById('segundoEUltimoFilhoDoFilho');
    segundoEUltimoFilhoDoFilho.remove();